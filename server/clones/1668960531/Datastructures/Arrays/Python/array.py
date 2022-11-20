def main():
    arr = [1,2, 100,3,4,5]

    # print array
    print("Array :",  arr)

    # index of giving value
    print("Array index of 3 is : ", arr.index(3))

    # PushBack(val)
    arr.append(20)
    print("Array : ", arr)

    # Size()
    print("Array Size: ", len(arr))

    # remove last element
    arr.pop()

    arr.reverse()
    print("array reversed ", arr)

    arr.sort()
    print("array sorted ", arr)

    # remove first occurence of item with given value
    arr.remove(100)
    print("Array ", arr)

if __name__ == "__main__":
    main()
