#include <stdio.h>
#include <stdlib.h>
#include <string.h>

const int tSize = 100;

typedef struct KeyValue {
  char *key;
  char *value;
  struct KeyValue *next;
} key_value;

typedef struct HashTable {
  key_value **data;
  int size;
} hash_table;

hash_table *create_table(int size);
void delete_table(hash_table *table);
int hash(char *value, int m);
key_value *get(hash_table *table, char *key);
void add(hash_table *table, char *key, char *value);
void delete (hash_table *table, char *key);
int exists(hash_table *table, char *key);

int main() {
  hash_table *table = create_table(tSize);
  add(table, "name", "hefni");
  printf("name is %s\n", get(table, "name")->value);
  add(table, "name", "this is updated text");
  printf("name is %s\n", get(table, "name")->value);
  delete (table, "name");
  printf("if exists is %d\n", exists(table, "name"));
  delete_table(table);
}

hash_table *create_table(int size) {
  hash_table *table = malloc(sizeof(hash_table));

  table->data = malloc(sizeof(key_value) * size);

  for (int i = 0; i < size; i++)
    table->data[i] = NULL;
  table->size = size;

  return table;
}

void delete_table(hash_table *table) {
  for (int i = 0; i < table->size; i++) {
    key_value *kv = table->data[i];
    while (kv) {
      key_value *next = kv->next;
      free(kv->key);
      free(kv->value);
      free(kv);
      kv = next;
    }
  }
  free(table->data);
  free(table);
}

int hash(char *value, int m) {
  int hash = 0;
  for (int i = 0; value[i] != '\0'; i++)
    hash = hash * 31 + value[i];
  return abs(hash % m);
}

void add(hash_table *table, char *key, char *value) {
  int index = hash(key, table->size);
  key_value *kv = get(table, key);
  if (kv != NULL) {
    free(kv->value);
    kv->value = strdup(value);
    return;
  }
  kv = malloc(sizeof(key_value));
  kv->key = strdup(key);
  kv->value = strdup(value);
  kv->next = table->data[index];
  table->data[index] = kv;
}

key_value *get(hash_table *table, char *key) {
  int index = hash(key, table->size);
  key_value *kv = table->data[index];
  while (kv) {
    if (strcmp(kv->key, key) == 0) {
      return kv;
    }

    kv = kv->next;
  }
  return NULL;
}

void delete (hash_table *table, char *key) {
  int index = hash(key, table->size);
  key_value *prev = NULL;

  key_value *kv = table->data[index];
  while (kv) {
    if (strcmp(table->data[index]->key, key) == 0) {
      if (prev == NULL) {
        table->data[index] = kv->next;
      } else {
        prev->next = kv->next;
      }
      free(kv->key);
      free(kv->value);
      free(kv);
    }

    prev = kv;
    kv = kv->next;
  }
}

int exists(hash_table *table, char *key) { return get(table, key) != NULL; }
