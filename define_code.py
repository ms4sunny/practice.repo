def intro(first_name, last_name):
    print(f"Hi {first_name} {last_name}")
    print("Welcome to Hawa Layers")


intro("Muhammad", "Sajid")

def increment(number, by): # using function
    return number + by 


print(increment(10, by=5))  # using function

def multiply(*numbers):
    total = 1
    for number in numbers:
        total *= number
    return total


print(multiply(2, 3, 4))  # using function