<style scoped>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
  }
  .layout-nav{
    width: 420px;
    margin: 0 auto;
  }
  .layout-assistant{
    width: 300px;
    margin: 0 auto;
    height: inherit;
  }
  .layout-nav h1{
    color: #fff;
    text-align: center;
  }
  /*.layout-breadcrumb{*/
    /*padding: 10px 15px 0;*/
  /*}*/
  .layout-content{
    min-height: 450px;
    margin: 15px;
    overflow: hidden;
    background: #fff;
    border-radius: 4px;
  }
</style>
<template>
  <div class="layout">
    <Menu mode="horizontal" theme="dark">
      <div class="layout-nav">
        <h1>用户管理</h1>
      </div>
    </Menu>
    <Menu mode="horizontal" active-name="1">
      <div class="layout-assistant">
        <MenuItem name="1" @click.native="queryTable">查看信息</MenuItem>
        <MenuItem name="2" @click.native="searchUser">搜索用户</MenuItem>
        <MenuItem name="3" @click.native="addMsg">添加用户</MenuItem>
      </div>
    </Menu>
    <div class="layout-content">
      <div :style="{display: isSearchDisplay}"  style="padding-bottom: 5px;padding-top: 5px">
        <!--<label>查询：</label>-->
        <Input style="width: 300px" v-model="queryVal" placeholder="输入一种条件进行查询"></Input>
        <!--<Button type="ghost" @click="search">搜索</Button>-->
      </div>
      <Table border ref="selection" :columns="columns4" :data="searchData" :style="{display: isTableDisplay}"></Table>
      <!--<div class="layout-content-main" :style="{display:isDisplay}">Table</div>-->
      <!--<Table border ref="selection" :columns="columns4" :data="data1"></Table>-->
      <div :style="{display: isAddDisplay}">
        <div style="padding: 10px;text-align: center">
          <h2>添加用户</h2>
        </div>
        <div style="text-align: center">
          <div style="width: auto">
            <label>姓名：</label>
            <Input type="text" v-model="nameVal" placeholder="请输入姓名····" style="width: 300px; text-align: center"></Input>
          </div>
          <div style="width:auto; padding: 5px">
            <label>性别：</label>
            <Select v-model="sexVal" style="width:300px">
              <Option v-for="item in items" :value="item.selectVal" :keys="item.selectKey">{{item.selectVal}}</Option>
            </Select>
          </div>
          <div style="width: auto">
            <label>手机号：</label>
            <Input type="text" v-model="numberVal" placeholder="请输入手机号····" style="width: 300px"></Input>
          </div>
        </div>
        <div style="text-align: center; padding: 8px">
          <Button type="primary" @click="addUser">添加</Button>
        </div>
      </div>
    </div>
    <Modal v-model="userMsg" title="编辑用户信息" @on-ok="ok">
      <Input v-model="newName"></Input>
      <Select v-model="newSex" style="padding-top: 5px">
        <Option v-for="item in items" :value="item.selectVal" :keys="item.selectKey">{{item.selectVal}}</Option>
      </Select>
      <Input v-model="newNumber" style="padding-top: 5px"></Input>
    </Modal>
  </div>
</template>
<script>
  import Input from '../../node_modules/iview/src/components/input/input.vue'
  import Modal from '../../node_modules/iview/src/components/modal/modal.vue'
  import Stroe from '../Stroe.js'
  export default {
    components: {
      Modal,
      Input
    },
    data () {
      return {
        columns4: [
          {
            title: '姓名',
            key: 'name'
          },
          {
            title: '性别',
            key: 'sex'
          },
          {
            title: '手机号',
            key: 'number'
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.change(params.index)
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.remove(params.index)
                    }
                  }
                }, '删除')
              ])
            }
          }
        ],
        data1: Stroe.fetch(),
        items: [
          {
            selectKey: 'nan',
            selectVal: '男'
          },
          {
            selectKey: 'nv',
            selectVal: '女'
          }
        ],
        nameVal: '',
        sexVal: '',
        numberVal: '',
        userMsg: false,
        queryUser: [],
        newName: '',
        newSex: '',
        newNumber: '',
        userIndex: 0,
        queryVal: '',
        isTableDisplay: 'block',
        isAddDisplay: 'none',
        isSearchDisplay: 'none'
      }
    },
    watch: {
      data1: {
        handler: function (data1) {
          Stroe.save(data1)
        },
        deep: true
      }
    },
    methods: {
      remove (index) {
        this.data1.splice(index, 1)
      },
      change (index) {
        this.newName = this.data1[index].name
        this.newSex = this.data1[index].sex
        this.newNumber = this.data1[index].number
        this.userIndex = index
        this.userMsg = true
      },
      ok () {
        this.data1[this.userIndex].name = this.newName
        this.data1[this.userIndex].sex = this.newSex
        this.data1[this.userIndex].number = this.newNumber
        console.log(this.newName)
      },
      addUser () {
        this.$Message.config({
          top: 250,
          duration: 2
        })
        if (this.nameVal === '' || this.sexVal === '' || this.numberVal === '') {
          this.$Message.error('必须全部填写')
        } else {
          this.data1.push({
            name: this.nameVal,
            sex: this.sexVal,
            number: this.numberVal
          })
          this.nameVal = ''
          this.sexVal = ''
          this.numberVal = ''
          this.$Message.success('添加成功')
        }
      },
      addMsg () {
        console.log('3')
        this.isAddDisplay = 'block'
        this.isSearchDisplay = 'none'
        this.isTableDisplay = 'none'
      },
      queryTable () {
        console.log('1')
        this.isAddDisplay = 'none'
        this.isSearchDisplay = 'none'
        this.isTableDisplay = 'block'
      },
      searchUser () {
        console.log('2')
        this.isAddDisplay = 'none'
        this.isSearchDisplay = 'block'
        this.isTableDisplay = 'block'
      }
    },
    computed: {
//      查询
      searchData: function () {
        var search = this.queryVal
        if (search) {
          return this.data1.filter(function (item) {
            return Object.keys(item).some(function (key) {
              return String(item[key]).toLowerCase().indexOf(search) > -1
            })
          })
        }

        return this.data1
      }
    }
  }
</script>
