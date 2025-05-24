import math


print("Hi I'm Sunny" )
print("*" * 20)
using_variable = "this line is about using a variable"
print(using_variable)
print("This subject is extremely boring")
course = "Good Morning, this course is about using \"backslash\" in python"
print(course) # using backslash
using_newline = "This is a new line\nThis is the second line"
print(using_newline) # using newline
first_name = "Muhammad"
last_name = "Sajid"
full_name = first_name + " " + last_name # concatenation
print(full_name) 
print("--" * 20)
full = f"{first_name} {last_name}" # f-string
print(full) # using f-string
using_len_function = len(full_name) # using len function
print(using_len_function)
print(course.upper()) # using upper function
print(course.lower()) # using lower function
print(course.title()) # using title function
print(course.find("Morning")) # using find function
print(course.replace("Good", "Bad")) # using replace function
print(course.strip()) # using strip function
print("course" in course) # using in operator Boolean
print("course" not in course) # using not in operator Boolean
print(10 + 3) # using addition operator
print(10 - 3) # using subtraction operator
print(10 * 3) # using multiplication operator
print(10 / 3) # using division operator
print(10 // 3) # using floor division operator
print(10 % 3) # using modulus operator
print(10 ** 3) # using exponent operator
print("10" + "3") # using addition operator with strings
x = 10
x = x + 3 # using assignment operator
print(x) # using assignment operator
x += 3 # using assignment operator
print(x) # using assignment operator
print(round(2.9)) # using round function
print(abs(-2.9)) # using abs function
print(math.ceil(2.9)) # using ceil function
x = input("x: ")
y = int(x) + 5
print(f"x: {x}, y: {y}")