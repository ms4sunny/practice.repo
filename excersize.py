number1 = int(input("Enter a number: "))
number2 = int(input("Enter second number: "))  
number3 = int(input("Enter third number: "))
number4 = int(input("Enter fourth number: "))
number5 = int(input("Enter fifth number: "))
if number1 > number2 and number1 > number3 and number1 > number4 and number1 > number5:
    print(f"{number1} is the largest")
elif number2 > number3 and number2 > number4 and number2 > number5:
    print(f"{number2} is the largest")
elif number3 > number4 and number3 > number5:
    print(f"{number3} is the largest")
elif number4 > number5:
    print(f"{number4} is the largest")
else: print(f"{number5} is the largest")
