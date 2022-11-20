#include <stdio.h>
#include <stdlib.h>

#define MAX_SIZE 5

typedef struct HefniQueueImplementation {
  int read;
  int write;
  int data[MAX_SIZE];
} Queue;

Queue *create_queue();
void enqueue(Queue *queue, int key);
int dequeue(Queue *queue);
int empty(Queue *queue);

int main() {

  Queue *q = create_queue();
  enqueue(q, 3);
  enqueue(q, 8);
  enqueue(q, 8);
  enqueue(q, 1);
  printf("dequeue %d \n", dequeue(q));
  enqueue(q, 1);
  printf("dequeue %d \n", dequeue(q));
  printf("dequeue %d \n", dequeue(q));
  printf("dequeue %d \n", dequeue(q));
  printf("dequeue %d \n", dequeue(q));
  enqueue(q, 6);
  enqueue(q, 90);
  printf("dequeue %d \n", dequeue(q));
  printf("dequeue %d \n", dequeue(q));
}

Queue *create_queue() {
  Queue *q = malloc(sizeof(Queue));
  q->read = 0;
  q->write = 0;
  return q;
}

void enqueue(Queue *q, int key) {
  if (q->read > 0 && q->write == MAX_SIZE)
    q->write = 0;
  if ((q->read > 0 && q->write > 0) && (q->read == (q->write + 1))) {

    printf("Error : Can't enqueue . Queue is full");
    exit(EXIT_FAILURE);
  }
  if (q->write >= MAX_SIZE) {

    printf("Error : Can't enqueue  . Queue is full");
    exit(EXIT_FAILURE);
  }
  q->data[q->write++] = key;
}

int dequeue(Queue *q) {
  if (q->read == q->write && q->read != 1) {
    printf("Error : Can't dequeue Queue is empty");
    exit(EXIT_FAILURE);
  }
  if (q->read >= MAX_SIZE)
    q->read = 0;
  return q->data[q->read++];
}

int empty(Queue *queue) { return queue->read == queue->write; }
