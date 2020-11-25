import Mock from 'mockjs'
import treeData from './treeData'
import roleData from './roleData'
import userData from './userData'
import roleControlData from './roleControlData'

Mock.mock('/getTreeData', 'post', treeData)
Mock.mock('/getRoleData', 'post', roleData)
Mock.mock('/getUserData', 'post', userData)
Mock.mock('/getRoleControlData', 'post', roleControlData)

export default Mock
