#include <stdio.h>
#include <stdlib.h>

typedef struct HefniArrayImplementation {
  int size;
  int capacity;
  int *data;

} Harray;

Harray *array_new(int capacity);
int array_get(Harray *arr, int i);
int array_size(Harray *arr);
int array_capacity(Harray *arr);
int array_find(Harray *arr, int val);
int is_empty(Harray *arr);
void array_push(Harray *arr, int val);
void array_remove(Harray *arr, int val);
void array_set(Harray *arr, int i, int val);
void array_free(Harray *arr);
void array_print(Harray *arr, int all);

int main() {
  Harray *arr = array_new(2);
  if (is_empty(arr))
    printf("Array is empty\n");
  array_push(arr, 21);
  array_push(arr, 22);
  array_push(arr, 23);
  array_push(arr, 24);
  array_push(arr, 25);
  array_push(arr, 26);
  array_print(arr, 1);
  printf("Removing 23 \n");
  array_remove(arr, 23);
  array_print(arr, 1);
  array_push(arr, 25);
  array_print(arr, 1);
  for (int i = 0; i < 10000; i++) {
    array_push(arr, i);
  }
  printf("found 500 at %d \n", array_find(arr, 500));

  if (!is_empty(arr))
    array_print(arr, 0);

  array_free(arr);
}
Harray *array_new(int capacity) {
  Harray *arr = malloc(sizeof(Harray));
  arr->capacity = capacity;
  arr->size = 0;
  arr->data = (int *)malloc(arr->capacity * sizeof(int));
  return arr;
}

void array_push(Harray *arr, int val) {
  if (arr->size == arr->capacity) {
    int new_capacity = 2 * arr->capacity;
    arr->data = (int *)realloc(arr->data, sizeof(int) * new_capacity);
    arr->capacity = new_capacity;
  }
  arr->data[arr->size] = val;
  arr->size++;
}

void array_remove(Harray *arr, int val) {
  for (int i = 0; i < arr->size; i++) {
    if (arr->data[i] == val) {
      for (int j = i; j <= arr->size - 2; j++) {
        arr->data[j] = arr->data[j + 1];
      }
      break;
    }
  }
  arr->size -= 1;
}

int array_get(Harray *arr, int i) {
  if (i < 0 || i >= arr->capacity) {
    printf("Error: index out of range \n");
    exit(EXIT_FAILURE);
  }
  return arr->data[i];
}

void array_set(Harray *arr, int i, int val) {
  if (i < 0 || i >= arr->capacity) {
    printf("Error: index out of range \n");
    exit(EXIT_FAILURE);
  }
  arr->data[i] = val;
}

int array_size(Harray *arr) { return arr->size; }
int array_capacity(Harray *arr) { return arr->capacity; }
int is_empty(Harray *arr) {
  if (arr->size == 0) {
    return 1;
  }
  return 0;
}

int array_find(Harray *arr, int val) {
  for (int i = 0; i < arr->size; i++) {
    if (val == arr->data[i]) {
      return i;
      break;
    }
  }
  return -1;
}

void array_free(Harray *arr) {
  free(arr->data);
  free(arr);
}

void array_print(Harray *arr, int all) {
  printf("\n========================= Array Print =========================\n");
  printf("Array Size: %d\n", arr->size);
  printf("Array Capacity: %d\n", arr->capacity);
  if (all) {
    printf("Array Data: ");
    for (int i = 0; i < arr->size; i++) {
      printf(" %d", arr->data[i]);
    }
    printf("\n");
  }
}
