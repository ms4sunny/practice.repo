marks = [22.2, 33.3, 44.4, 55.5, 66.6, 77.7, 88.8, 99.9]    # using list
print(marks)  # using print function
print(type(marks))  # using type function
print(len(marks))  # using len function
print(marks[1:4])  # using list slicing
marks.append(100.0)  # using list append method
print(marks)  # using print function
print(marks[8])  # using print function
rendom = [4, 2, 7, 1, 5, 3, 6]  # using list
print(list.sort(rendom))  # using list sort method
print(rendom)  # using print function
print(rendom.sort(reverse=True))  # using list sort method
print(rendom)  # using print function
rendom.insert(2, 8) # using list insert method
print(rendom)  # using list insert method
rendom.append(4) # using list remove method
print(rendom)  # using list remove method
rendom.remove(4) # using list remove method
print(rendom)  # using list remove method
rendom.pop(7) # using list pop method
print(rendom)  # using list pop method
tuple_intro = (12, 54, 87, 14) # using tuple
print(type(tuple_intro)) # using type function
print(tuple_intro) # using print function
films = []  # using list
film = input("Enter your favorite film: ") # using input function
films.append(film) # using list append method
film = input("Enter your 2nd favorite film: ") # using input function
films.append(film) # using list append method
film = input("Enter your 3rd favorite film: ") # using input function
films.append(film) # using list append method
print(films) # using print function
list1 = [1, 2, 3, 4, 5, 4, 3, 2, 1] # using list
list2 = [1, 2, 3, 4, 5, 6, 7, 8, 9] # using list
copy_list1 = list1.copy() # using list copy method
copy_list1.reverse() # using list reverse method
if(list1 == copy_list1): # using if statement
    print("List is palindrome") # using print function
else:("List is not palindrome") # using print function
print(list1) # using print function