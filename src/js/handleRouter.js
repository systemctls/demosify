import _demoList from '.demoList.json';
import VesselPage from '@/pages/vessel.vue';

function demoListTree (arr = []) {
  if(arr.children) {
    arr.children.forEach(item => {
      item.path = arr.path + '/' + item.src;
      if(item.children) {
        demoListTree(item)
      }
    })
  }
}

_demoList.forEach(item => {
  item.path = item.src
  if(item.children){
    demoListTree(item)
  }
})
// 优化，不注册 children 分组
const openTree = tree => {
  let result = [];
  const flat = nodes => {
    if (nodes && nodes.length > 0)
      nodes.forEach(node => {
       !node.children && result.push({ name: node.path, path: '/' + node.path, component: VesselPage });
        flat(node.children);
      });
  };
  flat(tree);
  return result;
};

let routerList = openTree(_demoList)
let demoList = routerList.map(item => item.name)
let links = _demoList

export {
  routerList,
  demoList,
  links
}