#include <stdio.h>
#include <stdlib.h>

typedef struct BstNode {
  int data;
  struct BstNode *left;
  struct BstNode *right;
} node;

node *get_node(int data);
node *insert(node *root, int data);
int in_tree(node *root, int data);
int get_min(node *root);
int get_max(node *root);
int get_height(node *root);
int get_nodes_count(node *root);
int is_bst(node *root);
node *delete_value(node *root, int data);
void delete_tree(node *root);
void print_tree(node *root);

int main() {
  node *root = NULL;

  root = insert(root, 15);
  root = insert(root, 10);
  root = insert(root, 11);
  root = insert(root, 12);
  root = insert(root, 14);
  root = insert(root, 140);
  root = insert(root, 16);
  root = insert(root, 1);

  if (in_tree(root, 13))
    printf("node is in tree\n");
  delete_value(root, 14);
  if (is_bst(root))
    printf("Tree is BST \n");
  printf("Tree height is : %d\n", get_height(root));
  printf("Node count in tree is : %d \n", get_nodes_count(root));
  printf("min is : %d\n", get_min(root));
  printf("max is : %d\n", get_max(root));
  print_tree(root);
  delete_tree(root);
}

node *get_node(int data) {
  node *bst_node = malloc(sizeof(node));
  bst_node->data = data;
  bst_node->left = bst_node->right = NULL;
  return bst_node;
}

node *insert(node *root, int data) {
  if (root == NULL) {
    root = get_node(data);
  } else if (data <= root->data) {
    root->left = insert(root->left, data);
  } else {
    root->right = insert(root->right, data);
  }
  return root;
}

int in_tree(node *root, int data) {
  if (root == NULL)
    return 0;
  else if (data == root->data)
    return 1;
  else if (data <= root->data)
    return in_tree(root->left, data);
  else
    return in_tree(root->right, data);
}

int get_min(node *root) {
  if (root == NULL) {
    printf("the tree is empty");
    exit(EXIT_FAILURE);
  }
  if (root->left == NULL)
    return root->data;
  else
    return get_min(root->left);
}

int get_max(node *root) {
  if (root == NULL) {
    printf("the tree is empty");
    exit(EXIT_FAILURE);
  }

  if (root->right == NULL)
    return root->data;
  else
    return get_max(root->right);
}

int max(int a, int b) { return a > b ? a : b; }

int get_height(node *root) {
  if (root == NULL)
    return -1;
  int left = get_height(root->left);
  int right = get_height(root->right);
  return max(left, right) + 1;
}

int get_nodes_count(node *root) {
  if (root == NULL)
    return 0;
  return 1 + get_nodes_count(root->left) + get_nodes_count(root->right);
}

int is_subtree_lesser(node *root, int value) {
  if (root == NULL)
    return 1;
  if (root->data <= value && is_subtree_lesser(root->left, value) &&
      is_subtree_lesser(root->right, value)) {
    return 1;
  } else {
    return 0;
  }
}

int is_subtree_greater(node *root, int value) {
  if (root == NULL)
    return 1;
  if (root->data > value && is_subtree_greater(root->left, value) &&
      is_subtree_greater(root->right, value)) {
    return 1;
  } else {
    return 0;
  }
}

int is_bst(node *root) {
  if (root == NULL)
    return 1;
  if (is_subtree_lesser(root->left, root->data) &&
      is_subtree_greater(root->right, root->data) && is_bst(root->left) &&
      is_bst(root->right))
    return 1;
  else
    return 0;
}

node *delete_value(node *root, int value) {
  if (root == NULL)
    return root;

  if (value < root->data) {
    root->left = delete_value(root->left, value);
  } else if (value > root->data) {
    root->right = delete_value(root->right, value);
  } else { // found value

    if (root->left == NULL && root->right == NULL) {
      free(root);
      root = NULL;
    } else if (root->left == NULL) {
      node *temp = root;
      root = root->right;
      free(temp);
    } else if (root->right == NULL) {
      node *temp = root;
      root = root->left;
      free(temp);
    } else {
      int right_min = get_min(root->right);
      root->data = right_min;
      root->right = delete_value(root->right, right_min);
    }
  }

  return root;
}

void delete_tree(node *root) {
  if (root == NULL)
    return;
  delete_tree(root->left);
  delete_tree(root->right);
  free(root);
}

void print_tree(node *root) {
  if (root == NULL)
    return;
  print_tree(root->left);
  printf("%d\n", root->data);
  print_tree(root->right);
}
