<template>
    <div class="fileAttributeSearch">
        <el-row class="topTitle">
            <span class="el-icon-s-operation">文件属性搜索接口说明</span>
            <router-link to="/serviceUser">
                <el-button type="primary" class="goIndex" size="mini" icon="el-icon-s-home">
                    返回首页
                </el-button>
            </router-link>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6">
                <span class="fontStyle">请求方式</span>
                <el-input value="POST" :disabled="true"/>
            </el-col>
            <el-col :span="18">
                <span class="fontStyle">请求URL</span>
                <el-input v-model="ipAndPort" :disabled="true"/>
            </el-col>
        </el-row>
        <el-divider/>
        <span class="fontStyle">请求参数列表</span>
        <!--请求参数列表展示-->
        <el-table :data="tableData" border size="medium">
            <el-table-column prop="field" label="字段" width="160px" align="center"/>
            <el-table-column prop="fieldType" width="100px" label="类型" align="center"/>
            <el-table-column prop="isRequired" label="是否必填" align="center"/>
            <el-table-column prop="remark" label="描述" align="center"/>
        </el-table>
        <el-divider/>
        <el-row>
            <span class="fontStyle">使用方式如下</span>
            <el-input v-model="requestAddressForToken" style="font-size: 16px;margin-top: 10px"
                      :disabled="true"/>
            <el-divider>或</el-divider>
            <el-input v-model="requestAddress" style="font-size: 16px;margin-top: 10px" :disabled="true"/>
        </el-row>
        <el-divider/>
        <el-row :gutter="20">
            <el-col :span="12">
                <span class="fontStyle">正常响应字段明细</span>
                <!--请求参数列表展示-->
                <el-table :data="responseData" border height="560px" size="medium">
                    <el-table-column prop="field" label="响应字段" align="center"/>
                    <el-table-column prop="fieldType" label="字段类型" align="center"/>
                    <el-table-column prop="remark" label="描述" align="center"/>
                </el-table>
            </el-col>
            <el-col :span="12" class="filtstyle">
                <span class="fontStyle">正常显示如下：</span>
                <scrollbar>
                    <pre style="font-size: 16px;height: 530px">
                           {
                                "status":"NORMAL",
                                "message":[
                                    {
                                        "source_path":"/test/文件采集/10265.docx",
                                        "downloadpath":"http://xxx/downloadFileSDO.do?view_down_file_id=16100&view_down_file_name=10265.docx",
                                        "file_suffix":"docx",
                                        "file_id":"161009900000125958055591",
                                        "storage_date":"20161009",
                                        "storage_time":"125958",
                                        "original_update_date":"20160922",
                                        "original_update_time":"114526",
                                        "file_md5":"ada1cde354c05f0e9240ecdb21961d1f",
                                        "file_size":"15145.00",
                                        "original_name":"10265.docx",
                                        "fcs_name":"csss",
                                        "collect_set_id":"1000000102",
                                        "dep_id":"1000000102,100000201",
                                        "datasource_name":"yuan",
                                        "source_id":"1000000079",
                                        "agent_name":"文件采集",
                                        "agent_id":"1000000081",
                                        "file_avro_path":"/hrds/395/B0/10/20161009/avro_1475988430834"
                                        "file_avro_block":"368284464"
                                    }
                                ]
                            }
                    </pre>
                </scrollbar>
            </el-col>
        </el-row>
        <el-divider/>
        <el-row :gutter="20">
            <el-col :span="12">
                <span class="fontStyle">错误响应字段明细</span>
                <!--响应参数列表展示-->
                <el-table :data="errorData" border size="medium">
                    <el-table-column prop="state" label="状态字段名" align="center"/>
                    <el-table-column prop="description" label="状态说明" align="center"/>
                </el-table>
            </el-col>
            <el-col :span="12">
                <span class="fontStyle">错误响应如下：</span>
                <pre style="font-size: 16px;">
                    {
                        "status":UNAUTHORIZED,
                        "message":"账号或密码错误..."
                    }
                </pre>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import * as interfaceFunctionAll from "./api";
    import Scrollbar from '../../../components/scrollbar';

    export default {
        name: "fileAttributeSearch",
        components: {
            Scrollbar
        },
        data() {
            return {
                ipAndPort: '',
                requestAddressForToken: '',
                requestAddress: '',
                tableData: [
                    {
                        field: 'user_id',
                        fieldType: 'Long',
                        isRequired: '必填，与user_password同选',
                        remark: '用户ID',
                    },
                    {
                        field: 'user_password',
                        fieldType: 'String',
                        isRequired: '必填，与user_id同选',
                        remark: '密码',
                    },
                    {
                        field: 'token',
                        fieldType: 'String',
                        isRequired: '必填，和user_id,user_password选择一种模式',
                        remark: 'token值',
                    },
                    {
                        field: 'url',
                        fieldType: 'String',
                        isRequired: '必填',
                        remark: '请求路径（fileAttributeSearch）',
                    },
                    {
                        field: 'ds_name',
                        fieldType: 'String',
                        isRequired: '选填(支持模糊查询)',
                        remark: '数据源名称',
                    },
                    {
                        field: 'fcs_name',
                        fieldType: 'String',
                        isRequired: '选填(支持模糊查询)',
                        remark: '任务采集名称',
                    },
                    {
                        field: 'agent_name',
                        fieldType: 'String',
                        isRequired: '选填(支持模糊查询)',
                        remark: 'Agent采集名称',
                    },
                    {
                        field: 'filename',
                        fieldType: 'String',
                        isRequired: '选填(支持模糊查询)',
                        remark: '要查询文件名',
                    },
                    {
                        field: 'filesize',
                        fieldType: 'String',
                        isRequired: '选填(数值以字节为单位,例如filesize=1,2000输入范围值以英文逗号隔开)',
                        remark: '要查询文件大小',
                    },
                    {
                        field: 'filesuffix',
                        fieldType: 'String',
                        isRequired: '选填(filesuffix=xlsx 例如xlsx,docx,支持多个类型以英文逗号隔开)',
                        remark: '要查询文件后缀',
                    },
                    {
                        field: 'num',
                        fieldType: 'String',
                        isRequired: '选填，不填默认显示10条,填写方式如: num=10',
                        remark: '显示条数',
                    },
                    {
                        field: 'filemd5',
                        fieldType: 'String',
                        isRequired: '选填(32位文件内容MD5值)',
                        remark: '文件md5',
                    },
                    {
                        field: 'filepath',
                        fieldType: 'String[]',
                        isRequired: '选填(文件路径,支持多个路径)',
                        remark: '要查询文件的路径',
                    },
                    {
                        field: 'storagedate',
                        fieldType: 'String',
                        isRequired: '选填(时间格式为20160926)',
                        remark: '要查询文件入库日期',
                    },
                    {
                        field: 'dep_id',
                        fieldType: 'Long[]',
                        isRequired: '选填(多个部门传数组)',
                        remark: '要查询部门id',
                    },
                    {
                        field: 'fcs_id',
                        fieldType: 'Long[]',
                        isRequired: '选填(多个任务传数组)',
                        remark: '要查询任务id',
                    }
                ],
                errorData: [
                    {
                        state: 'UNAUTHORIZED',
                        description: '账号或密码错误',
                    },
                    {
                        state: 'INTERFACE_STATE',
                        description: '接口处于禁用状态',
                    },
                    {
                        state: 'USE_VALIDDATE',
                        description: '接口使用效期已过',
                    },
                    {
                        state: 'LIMIT_NUM_ERROR',
                        description: '显示条数错误(填写错误时,只显示10条)',
                    },
                    {
                        state: 'NO_PERMISSIONS',
                        description: '没有接口使用权限',
                    },
                    {
                        state: 'START_DATE_ERROR',
                        description: '接口开始使用日期未到',
                    },
                    {
                        state: 'EXCEPTION',
                        description: '异常错误',
                    },
                ],
                responseData: [
                    {
                        field: 'source_path',
                        fieldType: 'String',
                        remark: '文件原路径',
                    },
                    {
                        field: 'downloadpath',
                        fieldType: 'String',
                        remark: '文件下载地址',
                    },
                    {
                        field: 'file_suffix',
                        fieldType: 'String',
                        remark: '文件后缀',
                    },
                    {
                        field: 'file_id',
                        fieldType: 'String',
                        remark: '文件唯一编号',
                    },
                    {
                        field: 'storage_date',
                        fieldType: 'String',
                        remark: '采集入库日期',
                    },
                    {
                        field: 'storage_time',
                        fieldType: 'String',
                        remark: '采集入库时间',
                    },
                    {
                        field: 'original_update_date',
                        fieldType: 'String',
                        remark: '原文件最后修改日期',
                    },
                    {
                        field: 'original_update_time',
                        fieldType: 'String',
                        remark: '原文件最后修改时间',
                    },
                    {
                        field: 'file_md5',
                        fieldType: 'String',
                        remark: '文件md5',
                    },
                    {
                        field: 'file_size',
                        fieldType: 'String',
                        remark: '文件大小（byte）',
                    },
                    {
                        field: 'original_name',
                        fieldType: 'String',
                        remark: '原文件名称',
                    },
                    {
                        field: 'fcs_name',
                        fieldType: 'String',
                        remark: '采集任务名称',
                    },
                    {
                        field: 'collect_set_id',
                        fieldType: 'String',
                        remark: '采集任务唯一编号',
                    },
                    {
                        field: 'dep_id',
                        fieldType: 'String',
                        remark: '部门ID',
                    },
                    {
                        field: 'datasource_name',
                        fieldType: 'String',
                        remark: '数据源名称',
                    },
                    {
                        field: 'source_id',
                        fieldType: 'String',
                        remark: '数据源ID',
                    },
                    {
                        field: 'agent_name',
                        fieldType: 'String',
                        remark: '采集Agent名称',
                    },
                    {
                        field: 'agent_id',
                        fieldType: 'String',
                        remark: '采集Agent唯一编号',
                    },
                ]
            }
        },
        watch: {
            $route(to, from) {
                this.$router.go(0)
            }
        },
        mounted() {
            this.getIpAndPort();
        },
        methods: {
            // 查询当前用户的IP与端口信息
            getIpAndPort() {
                interfaceFunctionAll.getIpAndPort()
                    .then(res => {
                        this.ipAndPort = "http://" + res.data +
                            "/G/action/hrds/g/biz/serviceuser/impl/" + this.$route.query.url;
                        this.requestAddressForToken =
                            this.ipAndPort +
                            "?token=AJALalfja&url=" + this.$route.query.url + "&tableName=emp" +
                            "&filename=20160620&num=20";
                        this.requestAddress = this.ipAndPort +
                            "?user_id=1005&user_password=111111&&url=" + this.$route.query.url +
                            "&filename=20160620&num=20";
                    })
            },
        }
    }
</script>

<style scoped>
    .filtstyle >>> .scrollbar-wrap .scrollbar__content {
        position: relative;
    }

    .el-table {
        margin-top: 10px;
    }

    .el-input {
        margin-top: 10px;
    }

    .fontStyle {
        color: #2196f3;
        font-size: 18px;
    }
</style>