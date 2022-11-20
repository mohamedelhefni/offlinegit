#include <stdio.h>
#include <stdlib.h>

typedef struct node {
  int key;
  struct node *next;
} node;

typedef struct HefniImplementationSinglyLinkedList {
  struct node *head;
  struct node *tail;
} List;

List *create_list();
int top_front(List *list);
int top_back(List *list);
int is_empty(List *list);
int find(List *list, int val);
int size(List *list);
void push_front(List *list, int val);
void pop_front(List *list);
void push_back(List *list, int val);
void pop_back(List *list);
void print_list(List *list);
void erase(List *list, int val);

int main() {
  List *lst = create_list();
  if (is_empty(lst))
    printf("list is empty\n");
  push_back(lst, 20);
  push_back(lst, 30);
  printf("list size is: %d \n", size(lst));
  if (find(lst, 20))
    printf("20 founded \n");
  push_back(lst, 40);
  if (!find(lst, 50))
    printf("50 not founded \n");
  pop_front(lst);
  push_front(lst, 10);
  push_back(lst, 50);
  pop_back(lst);
  erase(lst, 1);
  print_list(lst);
  printf("list size is: %d \n", size(lst));
  printf("\nfirst Element in list is:  %d\n", top_front(lst));
  printf("Last Element in list is : %d\n", top_back(lst));
}

List *create_list() {
  List *list = malloc(sizeof(List));
  list->head = NULL;
  list->tail = NULL;
  return list;
}

int is_empty(List *list) { return (list->head == NULL && list->tail == NULL); }

int size(List *list) {
  if (is_empty(list))
    return 0;

  int size = 0;
  node *n;
  for (n = list->head; n != NULL; n = n->next)
    ++size;
  return size;
}

int top_front(List *list) { return list->head->key; }

int top_back(List *list) { return list->tail->key; }

int find(List *list, int val) {
  int found = 0;
  node *n = list->head;
  while (n != NULL) {
    if (n->key == val) {
      found = 1;
      break;
    }
    n = n->next;
  }
  return found;
}

void erase(List *list, int index) {
  if (list->head == 0) {
    printf("Cannot erase: empty list\n");
    exit(EXIT_FAILURE);
  }
  node *current = list->head;
  node *last = list->head;

  int current_index = 0;
  while (index > current_index && current != 0) {
    ++current_index;
    last = current;
    current = current->next;
  }

  if (current_index < index) {
    printf("Index out of bounds\n");
    exit(EXIT_FAILURE);
  }

  if (index == 0) {
    list->head = current->next;
    if (list->tail == current) {
      list->tail = list->head;
    }
  } else {
    last->next = current->next;
    if (list->tail == current) {
      list->tail = last;
    }
  }

  free(current);
}

void push_front(List *list, int val) {
  node *nd = malloc(sizeof(node));
  nd->key = val;
  nd->next = list->head;
  list->head = nd;
}

void pop_front(List *list) {
  if (list->head == NULL) {
    printf("List is empty ");
    exit(EXIT_FAILURE);
  } else {
    node *tmp = list->head;
    list->head = list->head->next;
    free(tmp);
  }
}

void push_back(List *list, int val) {
  struct node *nd = malloc(sizeof(node));
  nd->key = val;
  nd->next = NULL;
  if (list->tail == NULL) {
    list->tail = nd;
    list->head = list->tail;
  } else {
    list->tail->next = nd;
    list->tail = nd;
  }
}

void pop_back(List *list) {
  if (list->tail == NULL) {
    printf("Error List is empty ");
    exit(EXIT_FAILURE);
  }

  if (list->head == list->tail) {
    free(list->head);
    list->head = list->tail = NULL;
  } else {
    node *p = list->head;
    node *last = list->head;
    while (p != list->tail) {
      last = p;
      p = p->next;
    }
    free(p);
    last->next = NULL;
    list->tail = last;
  }
}

void print_list(List *list) {

  node *n = list->head;
  while (n != NULL) {
    printf(n->next ? "%d->" : "%d", n->key);
    n = n->next;
  }
  printf("\n");
}
