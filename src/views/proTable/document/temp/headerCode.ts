export const headerCode = `
 <!-- ProTable 中 tableHeader 插槽 -->
 <slot name="tableHeader" :selected-list="selectedList" :selected-list-ids="selectedListIds" :is-selected="isSelected" />

 <!-- 页面使用 -->
 <template #tableHeader="scope">
     <el-button type="primary" :icon="CirclePlus" @click="openDrawer('新增')">新增用户</el-button>
     <el-button type="primary" :icon="Upload" plain @click="batchAdd">批量添加用户</el-button>
     <el-button type="primary" :icon="Download" plain @click="downloadFile">导出用户数据</el-button>
     <el-button type="danger" :icon="Delete" plain @click="batchDelete(scope.selectedListIds)" :disabled="!scope.isSelected">批量删除用户</el-button>
 </template>`;
