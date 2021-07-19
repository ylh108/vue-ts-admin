<template>
    <div>
        <el-button size="small" type="primary" @click="handleDownload" style="margin-bottom:20px">导出</el-button>
        <el-table ref="multipleTable" :data="list" border fit highlight-current-row style="width: 100%">
            <el-table-column align="center" label="Id" width="95">
                <template slot-scope="scope">
                    {{ scope.$index }}
                </template>
            </el-table-column>
            <el-table-column label="" align="center">
                <el-table-column label="Title">
                    <template slot-scope="scope">
                        {{ scope.row.title }}
                    </template>
                </el-table-column>
                <el-table-column label="Author" align="center" width="180">
                    <template slot-scope="scope">
                        <el-tag>{{ scope.row.author }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="Readings" align="center" width="115">
                    <template slot-scope="scope">
                        {{ scope.row.pageviews }}
                    </template>
                </el-table-column>
            </el-table-column>
            <el-table-column align="center" label="Date" width="220">
                <template slot-scope="scope">
                    <span>{{ scope.row.timestamp | parseTime('{y}-{m}-{d}') }}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import { formatJson } from '@/utils/index.ts'
import { exportJson2Excel } from '@/utils/excel.ts'
@Component({
    components: {}
})
export default class ExportMergeHeader extends Vue {
    private list: any = [
        {
            id: 0,
            status: 'published',
            title: 'Assumenda sapiente quod alias inventore itaque.',
            abstractContent:
                'Atque assumenda maxime ipsum adipisci expedita mollitia reiciendis id rem. Aliquam cum commodi dolores blanditiis repellendus et magni et molestias.',
            fullContent:
                '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
            sourceURL: 'http://braulio.org',
            imageURL: 'http://lorempixel.com/640/480',
            timestamp: 1584136141651,
            platforms: ['a-platform'],
            disableComment: false,
            importance: 2,
            author: 'Dakota Marks',
            reviewer: 'Maritza Muller',
            type: 'US',
            pageviews: 335
        },
        {
            id: 1,
            status: 'deleted',
            title: 'Dolorum exercitationem delectus vero dolore pariatur.',
            abstractContent:
                'Quis quis qui qui sapiente. Eveniet qui eaque vero odit ut cumque provident et est.',
            fullContent:
                '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
            sourceURL: 'http://bill.net',
            imageURL: 'http://lorempixel.com/640/480',
            timestamp: 1578107313969,
            platforms: ['a-platform'],
            disableComment: false,
            importance: 2,
            author: 'Thomas Bashirian',
            reviewer: 'Cullen Parisian',
            type: 'US',
            pageviews: 384
        },
        {
            id: 2,
            status: 'published',
            title: 'Omnis atque non et provident occaecati.',
            abstractContent:
                'Et ut praesentium quia ea sed saepe. Et voluptatum omnis impedit est voluptatum.',
            fullContent:
                '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
            sourceURL: 'http://perry.biz',
            imageURL: 'http://lorempixel.com/640/480',
            timestamp: 1581816319785,
            platforms: ['c-platform'],
            disableComment: false,
            importance: 2,
            author: 'Avery Brekke',
            reviewer: 'Percival Jacobson',
            type: 'US',
            pageviews: 431
        },
        {
            id: 3,
            status: 'published',
            title: 'Nostrum consequatur dolor eum minima dicta.',
            abstractContent:
                'Ea accusantium commodi maiores officiis dolor minus quo qui praesentium. Voluptatem aperiam magni omnis asperiores.',
            fullContent:
                '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
            sourceURL: 'http://kaya.biz',
            imageURL: 'http://lorempixel.com/640/480',
            timestamp: 1565514073360,
            platforms: ['c-platform'],
            disableComment: false,
            importance: 1,
            author: 'Lori Sanford Jr.',
            reviewer: 'Ernestina Jast',
            type: 'US',
            pageviews: 352
        },
        {
            id: 4,
            status: 'draft',
            title: 'Quod molestias facilis quod repellendus sapiente.',
            abstractContent: 'Enim est voluptas. Voluptatum hic porro non.',
            fullContent:
                '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
            sourceURL: 'http://lorenzo.biz',
            imageURL: 'http://lorempixel.com/640/480',
            timestamp: 1578406325705,
            platforms: ['b-platform'],
            disableComment: true,
            importance: 3,
            author: 'Carmel Wyman',
            reviewer: 'Alek Homenick',
            type: 'EU',
            pageviews: 446
        },
        {
            id: 5,
            status: 'draft',
            title: 'Quo rem deleniti aperiam iure ut.',
            abstractContent:
                'Id reiciendis labore sed nihil voluptate perferendis minus ad. Sit mollitia dicta facilis libero.',
            fullContent:
                '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
            sourceURL: 'https://blanca.com',
            imageURL: 'http://lorempixel.com/640/480',
            timestamp: 1561522116001,
            platforms: ['b-platform'],
            disableComment: true,
            importance: 1,
            author: 'Raleigh Rau',
            reviewer: 'Pauline McGlynn',
            type: 'EU',
            pageviews: 318
        },
        {
            id: 6,
            status: 'published',
            title: 'Maxime aut vel itaque et et.',
            abstractContent:
                'Consequatur quia repellendus. A aspernatur quae et ipsam omnis excepturi.',
            fullContent:
                '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
            sourceURL: 'http://mose.info',
            imageURL: 'http://lorempixel.com/640/480',
            timestamp: 1582804967446,
            platforms: ['b-platform'],
            disableComment: true,
            importance: 3,
            author: 'Weldon Sporer',
            reviewer: 'Bennett Boyle',
            type: 'US',
            pageviews: 316
        },
        {
            id: 7,
            status: 'published',
            title: 'Pariatur neque assumenda aut quis quasi.',
            abstractContent:
                'Optio quod molestiae ut sed dolorem praesentium. Assumenda aliquam sunt sit at dolorum aut animi.',
            fullContent:
                '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
            sourceURL: 'http://allie.com',
            imageURL: 'http://lorempixel.com/640/480',
            timestamp: 1555744690172,
            platforms: ['a-platform'],
            disableComment: true,
            importance: 2,
            author: 'Haylie Treutel',
            reviewer: 'Nicholas Rowe',
            type: 'EU',
            pageviews: 468
        },
        {
            id: 8,
            status: 'deleted',
            title: 'Dolorem facere tempora necessitatibus ut consequatur.',
            abstractContent:
                'Dignissimos sunt reiciendis quia. Architecto voluptas saepe eos provident odit quis enim rerum.',
            fullContent:
                '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
            sourceURL: 'http://elouise.org',
            imageURL: 'http://lorempixel.com/640/480',
            timestamp: 1570057185108,
            platforms: ['b-platform'],
            disableComment: false,
            importance: 1,
            author: 'Karlee Schultz',
            reviewer: 'Janet Lockman',
            type: 'JP',
            pageviews: 458
        },
        {
            id: 9,
            status: 'published',
            title: 'Minus vel rerum laborum esse iure.',
            abstractContent:
                'Eligendi laborum consequatur facere ut rerum. Illo est voluptas eius dolores soluta enim perferendis.',
            fullContent:
                '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
            sourceURL: 'https://jeff.org',
            imageURL: 'http://lorempixel.com/640/480',
            timestamp: 1555725516579,
            platforms: ['c-platform'],
            disableComment: true,
            importance: 1,
            author: 'Jon Lemke',
            reviewer: 'Ethan Gislason',
            type: 'US',
            pageviews: 461
        },
        {
            id: 10,
            status: 'draft',
            title: 'Sunt qui atque ea sapiente dolor.',
            abstractContent:
                'Incidunt ducimus natus odio eos illo minima. Veritatis placeat voluptate corrupti deleniti.',
            fullContent:
                '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
            sourceURL: 'https://edyth.info',
            imageURL: 'http://lorempixel.com/640/480',
            timestamp: 1558420258387,
            platforms: ['b-platform'],
            disableComment: false,
            importance: 3,
            author: 'Shemar Beier',
            reviewer: 'Derick Renner',
            type: 'US',
            pageviews: 398
        },
        {
            id: 11,
            status: 'published',
            title: 'Qui quod quia quo qui quis.',
            abstractContent:
                'Odit dolore odio laudantium repellat. Delectus accusantium minima eos ad tempora architecto quia.',
            fullContent:
                '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
            sourceURL: 'http://rowan.name',
            imageURL: 'http://lorempixel.com/640/480',
            timestamp: 1583492313744,
            platforms: ['a-platform'],
            disableComment: true,
            importance: 3,
            author: 'Oral Wolf',
            reviewer: 'Casimer Bashirian',
            type: 'JP',
            pageviews: 474
        },
        {
            id: 12,
            status: 'draft',
            title: 'Autem veritatis sint id illo voluptatem.',
            abstractContent:
                'Saepe cum alias pariatur. Eos sit molestias quam ut qui ipsa quo ex voluptas.',
            fullContent:
                '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
            sourceURL: 'https://rosario.info',
            imageURL: 'http://lorempixel.com/640/480',
            timestamp: 1560680134506,
            platforms: ['b-platform'],
            disableComment: false,
            importance: 1,
            author: 'Mr. Kylee Bechtelar',
            reviewer: 'Chelsie Schimmel Jr.',
            type: 'US',
            pageviews: 386
        },
        {
            id: 13,
            status: 'deleted',
            title: 'Vel sint quos eos aut architecto.',
            abstractContent:
                'Atque eveniet qui facilis qui harum. Quia voluptate et expedita autem eaque iusto id voluptate.',
            fullContent:
                '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
            sourceURL: 'https://kaylah.net',
            imageURL: 'http://lorempixel.com/640/480',
            timestamp: 1571632235941,
            platforms: ['c-platform'],
            disableComment: false,
            importance: 1,
            author: 'Jannie Williamson Jr.',
            reviewer: 'Giovanna Lehner',
            type: 'CN',
            pageviews: 475
        },
        {
            id: 14,
            status: 'published',
            title: 'Voluptatem error sunt excepturi minus minima.',
            abstractContent:
                'Necessitatibus dolorum non ut. Totam voluptas illum.',
            fullContent:
                '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
            sourceURL: 'http://chanel.info',
            imageURL: 'http://lorempixel.com/640/480',
            timestamp: 1568804152453,
            platforms: ['b-platform'],
            disableComment: false,
            importance: 3,
            author: "Rusty O'Reilly",
            reviewer: 'Edyth Walsh',
            type: 'EU',
            pageviews: 300
        },
        {
            id: 15,
            status: 'draft',
            title: 'Consequuntur qui alias repellat in dicta.',
            abstractContent:
                'Modi ut est sed totam quas. Quibusdam omnis corrupti facilis libero sit autem.',
            fullContent:
                '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
            sourceURL: 'http://madelyn.name',
            imageURL: 'http://lorempixel.com/640/480',
            timestamp: 1554996981957,
            platforms: ['a-platform'],
            disableComment: true,
            importance: 2,
            author: 'Kay Kreiger',
            reviewer: 'Mia Vandervort',
            type: 'CN',
            pageviews: 388
        },
        {
            id: 16,
            status: 'published',
            title: 'Minima harum molestiae ut modi laudantium.',
            abstractContent:
                'Ut sapiente debitis commodi harum vero distinctio. Minima est quia tempore aut.',
            fullContent:
                '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
            sourceURL: 'https://irma.biz',
            imageURL: 'http://lorempixel.com/640/480',
            timestamp: 1566893026045,
            platforms: ['a-platform'],
            disableComment: false,
            importance: 2,
            author: 'Zaria Morar',
            reviewer: 'Weldon Schmitt',
            type: 'JP',
            pageviews: 400
        },
        {
            id: 17,
            status: 'published',
            title: 'Sit consequatur voluptas sit inventore nam.',
            abstractContent:
                'Non accusantium aut nam cupiditate. Ipsum consequatur blanditiis quidem dolore dolor.',
            fullContent:
                '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
            sourceURL: 'https://alverta.com',
            imageURL: 'http://lorempixel.com/640/480',
            timestamp: 1581157432057,
            platforms: ['c-platform'],
            disableComment: true,
            importance: 1,
            author: 'Janae Huel',
            reviewer: 'Dominic Raynor',
            type: 'JP',
            pageviews: 350
        },
        {
            id: 18,
            status: 'published',
            title: 'Distinctio vel reprehenderit id nemo quia.',
            abstractContent:
                'Nulla optio vitae omnis ad illo consectetur rem. Earum nulla dolore.',
            fullContent:
                '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
            sourceURL: 'http://lela.biz',
            imageURL: 'http://lorempixel.com/640/480',
            timestamp: 1580162878838,
            platforms: ['b-platform'],
            disableComment: true,
            importance: 3,
            author: 'Jack Wilderman',
            reviewer: 'Dorothea Dooley',
            type: 'EU',
            pageviews: 381
        },
        {
            id: 19,
            status: 'published',
            title: 'Dolor ipsum et dolorem quia unde.',
            abstractContent:
                'Aut natus iusto. Et fuga ipsam itaque provident eius cumque labore.',
            fullContent:
                '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>',
            sourceURL: 'https://riley.net',
            imageURL: 'http://lorempixel.com/640/480',
            timestamp: 1560629990638,
            platforms: ['a-platform'],
            disableComment: false,
            importance: 3,
            author: 'Kory Walker',
            reviewer: 'Sharon Schinner',
            type: 'US',
            pageviews: 410
        }
    ]
    private handleDownload () {
        const multiHeader = [['Id', 'Main Information', '', '', 'Date']]
        const header = ['', 'Title', 'Author', 'Readings', '']
        const filterVal = ['id', 'title', 'author', 'pageviews', 'timestamp'] // 对应标题索引导出的val
        const list = this.list
        const data = formatJson(filterVal, list)
        const merges = ['A1:A2', 'B1:D1', 'E1:E2']
        exportJson2Excel(header, data, 'sheet-titles', multiHeader, merges)
    }
}
</script>
<style lang="stylus" scoped></style>
