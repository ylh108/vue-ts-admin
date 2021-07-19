const TREEDATA = [
    //  第一级父节点树菜单结构 begin /
    { path: '/system', name: '系统配置', icon: 'el-icon-setting', code: '1', parentCode: '0', weight: 1 },
    { path: '/uploadImage', name: '上传图片', icon: 'el-icon-s-help', code: '2', parentCode: '0', weight: 1 },
    { path: '/routeNest', name: '路由嵌套', icon: 'el-icon-s-data', code: '3', parentCode: '0', weight: 1 },
    { path: '/touch', name: '拖动', icon: 'el-icon-date', code: '4', parentCode: '0', weight: 1 },
    { path: '/excel', name: 'Excel', icon: 'el-icon-files', code: '5', parentCode: '0', weight: 1 },
    { path: '/pdf', name: 'PDF', icon: 'el-icon-s-promotion', code: '6', parentCode: '0', weight: 1 },
    { path: '/echarts', name: 'echarts图表', icon: 'el-icon-wind-power', code: '7', parentCode: '0', weight: 1 },
    { path: '/uploadimgDrop', name: '上传图片（Drop）', icon: 'el-icon-picture-outline', code: '8', parentCode: '0', weight: 1 },
    { path: '/copy', name: '复制', icon: 'el-icon-document-copy', code: '9', parentCode: '0', weight: 1 },
    //  第一级父节点树菜单结构 end /

    //  第二级子节点树菜单结构 begin /
    { path: '/system/user', name: '用户管理', icon: 'none', code: '11', parentCode: '1', weight: 2 },
    { path: '/system/role', name: '角色管理', icon: 'none', code: '12', parentCode: '1', weight: 2 },
    { path: '/system/menu', name: '菜单管理', icon: 'none', code: '13', parentCode: '1', weight: 2 },
    { path: '/routeNest/table', name: '表格', icon: '', code: '31', parentCode: '3', weight: 2 },
    { path: '/routeNest/other', name: '其他', icon: 'none', code: '32', parentCode: '3', weight: 2 },
    { path: '/excel/upload', name: '导入', icon: 'none', code: '51', parentCode: '5', weight: 2 },
    { path: '/excel/uploadDrop', name: '导入（Drop）', icon: 'none', code: '52', parentCode: '5', weight: 2 },
    { path: '/excel/export', name: '导出', icon: 'none', code: '53', parentCode: '5', weight: 2 },
    { path: '/excel/exportMergeHeader', name: '导出-多级表头', icon: 'none', code: '54', parentCode: '5', weight: 2 },
    { path: '/pdf/export', name: 'PDF(html)导出', icon: 'none', code: '61', parentCode: '6', weight: 2 },
    { path: '/pdf/print', name: 'PDF(element组件)导出', icon: 'none', code: '62', parentCode: '6', weight: 2 },
    { path: '/pdf/blankPrint', name: '新窗口打印', icon: 'none', code: '63', parentCode: '6', weight: 2 },
    { path: '/echarts/china', name: '中国地图', icon: 'none', code: '71', parentCode: '7', weight: 2 },
    { path: '/echarts/province', name: '省地图', icon: 'none', code: '72', parentCode: '7', weight: 2 },
    { path: '/echarts/city', name: '城市地图', icon: 'none', code: '73', parentCode: '7', weight: 2 },
    { path: '/echarts/district', name: '区县地图', icon: 'none', code: '74', parentCode: '7', weight: 2 },
    { path: '/echarts/cascade', name: '级联地图', icon: 'none', code: '75', parentCode: '7', weight: 2 },
    //  第二级子节点树菜单结构 end /

    //  第三级子节点树菜单结构 begin /
    { path: '/routeNest/table/pages', name: '三级页面', icon: 'none', code: '311', parentCode: '31', weight: 3 },
    { path: '/routeNest/table/amount', name: '总计', icon: 'none', code: '312', parentCode: '31', weight: 3 },
    { path: '/routeNest/table/AmountMax', name: '不能大于总计', icon: 'none', code: '313', parentCode: '31', weight: 3 },
    //  第三级子节点树菜单结构 end /

    //  第四级子节点树菜单结构 begin /
    { path: '/routeNest/table/pages/checkbox', name: '复选框', icon: 'none', code: '3111', parentCode: '311', weight: 4 },
    { path: '/routeNest/table/pages/radio', name: '单选框', icon: 'none', code: '3112', parentCode: '311', weight: 4 }
    //  第四级子节点树菜单结构 end /
]

export default TREEDATA
