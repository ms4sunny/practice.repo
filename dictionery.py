dictionery = {
    "name": "Muhammad Sajid",
    "Institute": "IDM Pakistan",
    "Subjects": ["Python", "Product hunting", "Web Development", "AI agents", "Social Media Marketing"],
    "topics": ("online marketing", "digital marketing", "SEO", "SEM"),
    "age": 39,
} # This is a dictionary in Python containing personal information and interests

print(dictionery["name"])  # using print function to access value by key
print(dictionery["Institute"])  # using print function to access value by key
print(dictionery["Subjects"])  # using print function to access value by key
print(dictionery["topics"])  # using print function to access value by key
dictionery["father_name"] = "Aman Ullah"  # adding new key-value pair
dictionery["age"] = 40  # updating existing key-value pair
print(dictionery)  # using print function to display the entire dictionary
students = {
    "student1": {
        "name": "Ali",
        "age": 20,
        "subjects": {
            "Math": 95,
            "Science": 67,
            "English": 88
        } # This is a nested dictionary containing information about students
    },
    "student2": {
        "name": "Sarah",
        "age": 22,
        "subjects": {
            "History": 85,
            "Geography": 90,
            "Art": 78
        } # This is a nested dictionary containing information about students
    }
}  # This is a nested dictionary containing information about students
print(students["student1"]["subjects"]["Math"])  # using print function to access value by key
print(students["student2"]["name"])  # using print function to access value by key
print(students.keys())  # using print function to access keys of the dictionary
print(len(list(students)))  # using print function to access length of the dictionary
print(list(students.items()))  # using print function to access items of the dictionary
print(students["student1"].keys())  # using print function to access keys of the nested dictionary
print(students.values())  # using print function to access values of the dictionary
print(students.get("student3"))  # using print function to access value by key
students["student1"].update({"city": "Gujranwala"})  # updating existing key-value pair in nested dictionary
students["student2"].update({"city": "Lahore"})  # updating existing key-value pair in nested dictionary
print(students)  # using print function to display the updated nested dictionary
marks = {}  # This is an empty dictionary to store marks of students
phy = int(input("Enter Physics marks: "))  # using input function to get Physics marks
chem = int(input("Enter Chemistry marks: "))  # using input function to get Chemistry marks
math = int(input("Enter Math marks: "))  # using input function to get Math marks
marks.update({"Physics": phy, "Chemistry": chem, "Math": math})  # updating the empty dictionary with marks
print(marks)  # using print function to display the marks dictionary
