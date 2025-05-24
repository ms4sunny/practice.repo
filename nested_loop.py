for x in range(8):  # using for loop
    for y in range(8):
        print(f"{x} {y}") # using for loop
print(type(range(8))) # using type function
for x in "Muhammad Sajid":
    print(x) # using for loop
# count even numbers
number = 10
while number > 0:  # using while loop
    print(number)  # using while loop
    number -= 1
# using count variable
count = 0
for number in range(1, 21):
    if number % 2 == 0:  # using if statement
        count += 1
        print(number)
print(f"Count of even numbers: {count}")  # using print function