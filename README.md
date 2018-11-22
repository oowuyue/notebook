

df dfsdfsd

a commit
b commit

a stageing

a worktree


delelpt

dfsdfsfs
111


    //item:obj  itemParent:[]  itemIndexInParent:int
    function getItemInfo(id, lists) {

      for (let i = 0; i < lists.length; i++) {

        if (lists[i].id == id) {
          return [lists[i], lists, i]
        }

        if (lists[i].lists && lists[i].lists.length) {
          let res = getItemInfo(id, lists[i].lists)
          if (res) return res
        }

      }
    }

    console.log(getItemInfo(5, lists))
