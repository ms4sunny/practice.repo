set_value = {1, 2, 3, 3, 4, 4, 5}  # This is a set in Python containing unique values
print(set_value)  # using print function to display the set
print(type(set_value))  # using type function to check the type of the set
empty_set = set()  # This is an empty set in Python
print(empty_set)  # using print function to display the empty set
print(type(empty_set))  # using type function to check the type of the empty set
empty_set.add(6)  # adding a new element to the set
empty_set.add(5)  # adding another new element to the set
print(empty_set)  # using print function to display the updated set
set_value.remove(4)  # adding a new element to the set
print(set_value)  # using print function to display the updated set
set_value.add(7)  # adding a new element to the set
print(set_value)  # using print function to display the updated set
print(empty_set)  # using print function to display the cleared set
set_value.discard(3)  # removing an element from the set without raising an error if it doesn't exist
print(set_value)  # using print function to display the updated set
print(set_value.union(empty_set))  # performing union operation between two sets
print(set_value.pop()) # removing and returning an arbitrary element from the set
print(set_value.pop()) # removing and returning another arbitrary element from the set
print(set_value.intersection(empty_set))  # performing intersection operation between two sets
empty_set.clear()  # clearing the empty set
