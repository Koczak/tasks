# Create Flask app which will be REST API app for To-Do list, which allow
# user to create task, list, update and delete them. Data could be “mocked”, extra
# points for using SQLite or PostgreSQL. URLS need to be in REST API
# convention.


from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
migrate = Migrate(app, db)

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    completed = db.Column(db.Boolean, default=False)


with app.app_context():
    db.create_all()

@app.route('/tasks', methods=['GET'])
def get_tasks():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    tasks = Task.query.paginate(page=page, per_page=per_page, error_out=False)
    
    return jsonify({
        "tasks": [{"id": task.id, "title": task.title, "completed": task.completed} for task in tasks.items],
        "total": tasks.total,
        "pages": tasks.pages,
        "current_page": tasks.page
    })

@app.route('/tasks', methods=['POST'])
def create_task():
    data = request.json
    if not data or 'title' not in data:
        return jsonify({"error": "Title is required"}), 400
    if not isinstance(data['title'], str) or len(data['title'].strip()) == 0:
        return jsonify({"error": "Title must be a non-empty string"}), 400
    
    new_task = Task(title=data['title'].strip(), completed=data.get('completed', False))
    db.session.add(new_task)
    db.session.commit()
    return jsonify({"id": new_task.id, "title": new_task.title, "completed": new_task.completed}), 201

@app.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    task = Task.query.get(task_id)
    if task is None:
        return jsonify({"error": "Task not found"}), 404
    
    data = request.json
    if not data:
        return jsonify({"error": "No data provided"}), 400
    
    if 'title' in data:
        if not isinstance(data['title'], str) or len(data['title'].strip()) == 0:
            return jsonify({"error": "Title must be a non-empty string"}), 400
        task.title = data['title'].strip()
    
    if 'completed' in data:
        if not isinstance(data['completed'], bool):
            return jsonify({"error": "Completed must be a boolean"}), 400
        task.completed = data['completed']
    
    db.session.commit()
    return jsonify({"id": task.id, "title": task.title, "completed": task.completed})

@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    task = Task.query.get(task_id)
    if task is None:
        return jsonify({"error": "Task not found"}), 404
    db.session.delete(task)
    db.session.commit()
    return '', 204

@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Resource not found"}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Internal server error"}), 500

@app.errorhandler(400)
def bad_request(error):
    return jsonify({"error": "Bad request"}), 400

if __name__ == '__main__':
    app.run(debug=True)