# Create good script to create new list, which only contains users from Poland. Try to do it with List Comprehension.

users = [
    {"name": "Kamil", "country": "Poland"},
    {"name": "John", "country": "USA"},
    {"name": "Yeti"}
]

def get_polish_users(users):
    """Returns a list of users from Poland."""
    
    return [user for user in users if user.get("country") == "Poland"]

polish_users = get_polish_users(users)
print(polish_users)

# Display sum of first ten elements starting from element 5:

numbers = [1, 5, 2, 3, 1, 4, 1, 23, 12, 2, 3, 1, 2, 31, 23, 1, 2, 3, 1, 23, 1, 2, 3, 123]

def sum_of_ten_from_five(numbers):
    """Returns the sum of the first ten elements starting from the element 5."""
    
    try:
        start_index = numbers.index(5)
        return sum(numbers[start_index:start_index + 10])
    except ValueError:
        return "Number not found"

sum_of_ten = sum_of_ten_from_five(numbers)
print(sum_of_ten)

# Fill list with powers of 2, n [1..20]

def generate_powers_of_two():
    """Generates a list of powers of 2 from 2^1 to 2^20."""
   
    return [2**n for n in range(1, 21)]

powers_of_two = generate_powers_of_two()
print(powers_of_two)
