<template>
  <div>
    <el-upload
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.3)"
      list-type="picture-card"
      :file-list="filelist"
      action="#"
      :on-change="Change"
      :http-request="Request"
      :on-remove="onRemove"
      :on-preview="onPreview"
      :limit="limit"
      :class="`${filelist.length === limit ? 'hidenCard' : ''}`"
      :before-upload="beforeUpload"
    >
      <i slot="default" class="el-icon-plus" />
    </el-upload>
    <el-dialog
      title="图片预览"
      :visible.sync="previewImgDialogVisible"
    >
      <img style="width: 100%" :src="imgUrl">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDWu41kIdkcHjwwhCqJYZNxa0DCwTXO0OX',
  SecretKey: 'xf8NN8evSkocDZgYCdpmULxLUO5YmmX3'
})
console.log(cos)
export default {
  name: 'ImageUpload',
  props: {
    limit: {
      type: Number,
      default: 1
    },
    // eslint-disable-next-line vue/require-default-prop
    beforeUploadCkecked: Function
  },
  data() {
    return {
      filelist: [], // { name: 'default', url: 'http://destiny001.gitee.io/image/cxk.gif' }
      previewImgDialogVisible: false,
      imgUrl: '',
      loading: false
    }
  },
  methods: {
    // 上传图片
    Change(file, filelist) {
    //   console.log(file)
    //   console.log(filelist)
      this.filelist = filelist// 把改变后的数组给展示数组
    },
    Request(data) {
    //   console.log('Request', data)
      this.loading = true
      cos.putObject({
        Bucket: 'jurphy-harss-666-1313544685', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-nanjing', /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: data.file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        StorageClass: 'STANDARD',
        Body: data.file, // 上传文件对象
        onProgress: function(progressData) {
          // console.log(JSON.stringify(progressData))
          // 这个就是上传的百分比
          // params.percent 表示当前上传的进度
        }
      }, (err, data) => {
        console.log(err || data)
        this.loading = false
        if (err || data.statusCode !== 200) {
          return this.$message.error('图片传入有误，请重新传入图片')
        }
        this.$emit('onSuccess', { url: 'http://' + data.Location })
      })
    },
    // 删除图片的钩子函数
    onRemove(file, filelist) {
      this.filelist = filelist // 把删除后的数组给展示数组
    },
    // 预览图片的钩子函数
    onPreview(file) {
      this.previewImgDialogVisible = true
      this.imgUrl = file.url// 动态绑定数组图片
    },
    // 校验图片
    beforeUpload(file) {
    //   if (this.beforeUploadCkecked && !this.beforeUploadCkecked(file)) {
    //     return false
    //   }
      // 一般分两种情况
      // 自定义 完全 ==》所有的逻辑取决于 自定义， 自定义和默认是相互排斥的
      // if (this.beforeUploadCheck) {
      //   return this.beforeUploadCheck(file)//=== return false/true
      // }
      // 自定义 完全 ==》所有的逻辑取决于 先自定义 再默认， 自定义和默认是不相互排斥的

      // if (this.beforeUploadCheck && !this.beforeUploadCheck(file)) {// 先走自定义，然后走默认的
      //   return false
      // }
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      // 校验图片的格式
      if (!types.includes(file.type)) {
        this.$message.error(`请选择以下的图片格式${types.join(',')}`)
        return false
      }
      const maxSize = 5 * 1024 * 1024
      // 校验图片的大小
      if (file.size > maxSize) {
        this.$message.error(`图片最大为${maxSize}`)
        return false
      }
      return true
    }
  }

}
</script>

<style lang="scss">
.hidenCard {
    .el-upload--picture-card {
        display: none;
    }
}

</style>
