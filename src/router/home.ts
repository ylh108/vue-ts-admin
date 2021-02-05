export default {
    path: '/index',
    name: 'index',
    redirect: '/home',
    component: () => import('@/views/index.vue'),
    children: [
        {
            path: '/home',
            name: 'home',
            meta: { keepAlive: false },
            component: () => import('@/views/home/index.vue')
        },
        {
            path: '/copy',
            name: 'copy',
            meta: { keepAlive: false },
            component: () => import('@/views/copy/index.vue')
        },
        {
            path: '/touch',
            name: 'touch',
            meta: { keepAlive: true },
            component: () => import('@/views/touch/index.vue')
        },
        {
            path: '/system',
            name: 'system',
            redirect: '/system/user',
            component: () => import('@/views/system/index.vue'),
            children: [
                {
                    path: '/system/user',
                    name: 'user',
                    meta: { keepAlive: false },
                    component: () => import('@/views/system/user/index.vue')
                },
                {
                    path: '/system/role',
                    name: 'role',
                    meta: { keepAlive: true },
                    component: () => import('@/views/system/role/index.vue')
                },
                {
                    path: '/system/menu',
                    name: 'menu',
                    meta: { keepAlive: true },
                    component: () => import('@/views/system/menu/index.vue')
                }
            ]
        },
        {
            path: '/uploadImage',
            name: 'uploadImage',
            meta: { keepAlive: true },
            component: () => import('@/views/uploadImage/index.vue')
        },
        {
            path: '/uploadimgDrop',
            name: 'uploadimgDrop',
            meta: { keepAlive: true },
            component: () => import('@/views/uploadimgDrop/index.vue')
        },
        {
            path: '/routeNest',
            name: 'routeNest',
            redirect: '/routeNest/table',
            component: () => import('@/views/routeNest/index.vue'),
            children: [
                {
                    path: '/routeNest/table',
                    name: 'table',
                    redirect: '/routeNest/table/pages',
                    component: () => import('@/views/routeNest/table/index.vue'),
                    children: [
                        {
                            path: '/routeNest/table/pages',
                            name: 'pages',
                            redirect: '/routeNest/table/pages/checkbox',
                            component: () => import('@/views/routeNest/table/pages/index.vue'),
                            children: [
                                {
                                    path: '/routeNest/table/pages/checkbox',
                                    name: 'checkbox',
                                    meta: { keepAlive: true },
                                    component: () => import('@/views/routeNest/table/pages/checkbox/index.vue')
                                },
                                {
                                    path: '/routeNest/table/pages/radio',
                                    name: 'radio',
                                    meta: { keepAlive: true },
                                    component: () => import('@/views/routeNest/table/pages/radio/index.vue')
                                }
                            ]
                        },
                        {
                            path: '/routeNest/table/amountMax',
                            name: 'amountMax',
                            meta: { keepAlive: true },
                            component: () => import('@/views/routeNest/table/amountMax/index.vue')
                        },
                        {
                            path: '/routeNest/table/amount',
                            name: 'amount',
                            meta: { keepAlive: true },
                            component: () => import('@/views/routeNest/table/amount/index.vue')
                        }
                    ]
                },
                {
                    path: '/routeNest/other',
                    name: 'other',
                    meta: { keepAlive: true },
                    component: () => import('@/views/routeNest/other/index.vue')
                }
            ]
        },
        {
            path: '/excel',
            name: 'excel',
            redirect: '/excel/upload',
            component: () => import('@/views/excel/index.vue'),
            children: [
                {
                    path: '/excel/upload',
                    name: 'upload',
                    meta: { keepAlive: true },
                    component: () => import('@/views/excel/upload/index.vue')
                },
                {
                    path: '/excel/uploadDrop',
                    name: 'upload',
                    meta: { keepAlive: true },
                    component: () => import('@/views/excel/upload-drop/index.vue')
                },
                {
                    path: '/excel/export',
                    name: 'export',
                    meta: { keepAlive: true },
                    component: () => import('@/views/excel/export/index.vue')
                },
                {
                    path: '/excel/exportMergeHeader',
                    name: 'exportMergeHeader',
                    meta: { keepAlive: true },
                    component: () => import('@/views/excel/export-merge-header/index.vue')
                }
            ]
        },
        {
            path: '/pdf',
            name: 'pdf',
            redirect: '/pdf/export',
            component: () => import('@/views/pdf/index.vue'),
            children: [
                {
                    path: '/pdf/export',
                    name: 'pdfExport',
                    meta: { keepAlive: true },
                    component: () => import('@/views/pdf/export/index.vue')
                },
                {
                    path: '/pdf/print',
                    name: 'pdfPrint',
                    meta: { keepAlive: true },
                    component: () => import('@/views/pdf/print/index.vue')
                },
                {
                    path: '/pdf/blankPrint',
                    name: 'blankPrint',
                    meta: { keepAlive: true },
                    component: () => import('@/views/pdf/blankPrint/index.vue')
                }
            ]
        },
        {
            path: '/echarts',
            name: 'echarts',
            meta: { keepAlive: true },
            redirect: '/echarts/china',
            component: () => import('@/views/echarts/index.vue'),
            children: [
                {
                    path: '/echarts/china',
                    name: 'echartsChina',
                    meta: { keepAlive: true },
                    component: () => import('@/views/echarts/china/index.vue')
                },
                {
                    path: '/echarts/province',
                    name: 'echartsProvince',
                    meta: { keepAlive: true },
                    component: () => import('@/views/echarts/province/index.vue')
                },
                {
                    path: '/echarts/city',
                    name: 'echartsCity',
                    meta: { keepAlive: true },
                    component: () => import('@/views/echarts/city/index.vue')
                },
                {
                    path: '/echarts/district',
                    name: 'echartsArea',
                    meta: { keepAlive: true },
                    component: () => import('@/views/echarts/district/index.vue')
                },
                {
                    path: '/echarts/cascade',
                    name: 'echartsCascade',
                    meta: { keepAlive: true },
                    component: () => import('@/views/echarts/cascade/index.vue')
                }
            ]
        }
    ]
}
