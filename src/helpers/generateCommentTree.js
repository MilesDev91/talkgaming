// Receives an array of comments and reorganizes them into a structured tree object
export const generateCommentTree = (comments) => {
  let commentTree = [];

  for (let i in comments) {
    if (!comments[i].parentId) {
      commentTree.push(comments[i]);
      cycleParent(commentTree[commentTree.length - 1], comments);
    }
  }

  return commentTree;
};

// Cycles recursively through comments to check for children and builds out the tree.
function cycleParent(parent, comments) {
  for (let i in comments) {
    if (comments[i].id != parent.id && comments[i].parentId == parent.id) {
      if (!parent.children) {
        parent.children = [];
      }
      parent.children.push(comments[i]);
      cycleParent(comments[i], comments);
    }
  }
  return true;
}
