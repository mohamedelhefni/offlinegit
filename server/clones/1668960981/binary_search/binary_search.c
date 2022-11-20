#include <stdio.h>

int binary_search(int target, int arr[], int size) {
  int low = 0;
  int high = size - 1;
  while (low <= high) {
    int mid = (low + high) / 2;
    if (arr[mid] == target) {
      return mid;
    } else if (arr[mid] > target) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return -1;
}

int binary_search_recursion(int target, int arr[], int low, int high) {
  if (low > high)
    return -1;

  int mid = (low + high) / 2;
  if (arr[mid] > target)
    return binary_search_recursion(target, arr, low, mid - 1);
  else if (arr[mid] < target) {
    return binary_search_recursion(target, arr, mid + 1, high);
  } else {
    return mid;
  }
}

int main() {
  int arr[] = {1, 2, 4, 5, 6, 9, 11, 15, 39, 45, 90, 120};
  int pos = binary_search(45, arr, 12);
  if (pos >= 0) {
    printf("index of your num is %d\n", pos);
  } else {
    printf("we can't find your element");
  }

  pos = binary_search_recursion(10, arr, 0, 12);
  if (pos > 0) {
    printf("index of your num is %d\n", pos);
  } else {

    printf("we can't find your element");
  }
}
