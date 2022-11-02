<template>
    <div>
        <el-dialog :title="title" :visible.sync="addorputVisible" width="60%" :destroy-on-close="true"
            :close-on-click-modal="false" :before-close="handleClose">
            <el-form :model="addorputForm" ref="addorputForm" :rules="rules" label-width="120px">
                <el-form-item label="视频名称：">
                    <el-input v-model="addorputForm.dictLabel" size="medium" placeholder="输入视频名称" autocomplete="off">
                    </el-input>
                </el-form-item>
                <el-form-item label="上传视频" prop="courseUrl">
                    <el-upload class="avatar-uploader el-upload--text" :headers="videoUpload.headers"
                        :action="videoUpload.url" :show-file-list="false" accept=".mp4" :on-success="handleVideoSuccess"
                        :before-upload="beforeUploadVideo" :on-progress="uploadVideoProcess">

                        <!--视频区域，:src里面存放视频上传成功后的存储地址-->
                        <!-- <video style="width: 100%;" v-if="showVideoPath != '' && !videoFlag"
                            :src="videoUpload.url2 + showVideoPath" class="avatar video-avatar" controls="controls">
                            您的浏览器不支持视频播放
                        </video> -->
                        <video-player style="width: 50%;" v-if="showVideoPath != '' && !videoFlag"
                            class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true"
                            :options="playerOptions">
                        </video-player>
                        <!-- 变量showVideoPath如果不存在，就不显示，存在就显示视频 -->
                        <i v-else-if="showVideoPath == '' && !videoFlag" class="el-icon-plus avatar-uploader-icon">
                        </i>
                        <!--上传进度条区域-->
                        <el-progress :stroke-width="10" class="progressType" v-if="videoFlag == true" type="circle"
                            :percentage="videoUploadPercent" style="margin-top:30px;">
                        </el-progress>

                        <!--此为视频点击上传按钮 isShowUploadVideo代表按钮显示与否-->
                        <el-button class="video-btn" slot="trigger" size="small" v-if="isShowUploadVideo"
                            type="primary">点击上传视频</el-button>
                    </el-upload>
                </el-form-item>
                <!--form.courseUrl 代表成功上传返回的视频路径赋值给表单的这个属性，随后通过方法提交保存在对应的表中-->
                <el-form-item style="position: relative ;">
                    <el-input type="hidden" v-model="form.courseUrl" readonly class="noAlert" placeholder="" />
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="handleClose">取 消(취소)</el-button>
                <el-button type="primary" @click="dialogFormSubmit" v-preventReClick>确定(확인)</el-button>
            </div>
        </el-dialog>
    </div>
</template>
  
<script>
import { addVideo, editVideo } from '@/api/about'
import { getToken } from "@/utils/auth";
export default {
    props: {
        title: null,
    },
    data() {
        return {
            addorputVisible: false,
            addorputForm: {},
            form: {},
            rules: {},
            //拿到当前环境的请求前缀
            videoUpload: {
                // 设置上传的请求头部
                headers: { Authorization: "Bearer " + getToken() },
                // 上传的地址
                url: "http://49.247.22.30:8080/common/fileupload",
                url2: "http://49.247.22.30:8080",
            },
            showVideoPath: "",
            uploadUrl: "",//你要上传视频到你后台的地址
            videoFlag: false, //是否显示进度条
            videoUploadPercent: "", //进度条的进度，
            isShowUploadVideo: false, //显示上传按钮
            playerOptions: {
                playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
                autoplay: false,  // 如果为true,浏览器准备好时开始回放
                muted: false,     // 默认情况下将会消除任何音频。
                loop: false,      // 是否视频一结束就重新开始。
                preload: 'auto',  // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                language: 'zh-CN',
                aspectRatio: '16:9',  // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                fluid: true,  // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                sources: [{
                    type: "video/mp4",  // 类型
                    src: ''             // url地址
                }],
                poster: '',  // 封面地址
                notSupportedMessage: '此视频暂无法播放，请稍后再试',  // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
                controlBar: {
                    timeDivider: true,           // 当前时间和持续时间的分隔符
                    durationDisplay: true,       // 显示持续时间
                    remainingTimeDisplay: false, // 是否显示剩余时间功能
                    fullscreenToggle: true       // 是否显示全屏按钮
                }
            },
        };
    },
    methods: {
        handleClose() {
            this.addorputVisible = false;
        },
        //上传前回调
        beforeUploadVideo(file) {
            const isLt1024M = (file.size / 1024 / 1024) < 1024;
            this.form.videoSize = file.size / 1024 / 1024;
            //判断是不是MP4格式视频
            if (['video/mp4'].indexOf(file.type) != 0) {
                this.$message.error('请上传正确的视频格式');
                return false;
            }
            //单个视频大小限制在1024M以内
            if (!isLt1024M) {
                this.$message.error('上传视频大小不能超过1024MB哦!');
                return false;
            }
            this.isShowUploadVideo = false;
        },

        //进度条
        uploadVideoProcess(event, file, fileList) {
            this.videoFlag = true;
            this.videoUploadPercent = file.percentage.toFixed(0) * 1;
        },

        //上传成功回调
        handleVideoSuccess(res, file) {
            this.isShowUploadVideo = true;
            this.videoFlag = false;
            this.videoUploadPercent = 0;
            if (res != "") {
                this.showVideoPath = res.url;
                this.addorputForm.dictValue = res.url;
                this.playerOptions.sources[0].src = res.url;
                this.form.courseUrl = res.url;
            } else {
                this.$message.error('视频上传失败，请重新上传！');
            }
        },
        dialogFormSubmit() {
            // console.log(this.addorputForm);
            var version = {
                dictType: "about_video",
                dictLabel: this.addorputForm.dictLabel,
                dictValue: this.addorputForm.dictValue,
            };
            if (this.addorputForm.dictCode) {
                editVideo({ ...version, dictCode: this.addorputForm.dictCode }).then(
                    (res) => {
                        this.$message.success("修改成功！(성공적으로 수정되었습니다!)");
                        this.handleClose();
                        this.$parent.getList();
                    }
                );
            } else {
                addVideo(version).then((res) => {
                    // console.log(res)
                    if (res.code == 200) {
                        this.$message.success("新增成功(성공적으로 추가되었습니다)！");
                        this.handleClose();
                        this.$parent.getList();
                    }
                });
            }
        },
        openVisible(obj) {
            this.addorputForm = {};
            this.addorputVisible = true;
            this.showVideoPath = '';
            this.addorputForm.dictValue = '';
            this.form = {};
            this.uploadUrl = "";//你要上传视频到你后台的地址
            this.videoFlag = false;//是否显示进度条
            this.videoUploadPercent = ""; //进度条的进度，
            this.isShowUploadVideo = false //显示上传按钮
            if (obj) {
                // console.log(obj);
                this.addorputForm = obj;
                this.showVideoPath = obj.dictValue;
                this.playerOptions.sources[0].src = obj.dictValue;
                this.isShowUploadVideo = true //显示上传按钮

            }
        },
        fileList(img) {
            this.addorputForm.dictValue = img;
        },
    },
};
</script>
  
<style lang="scss" scoped>
// .avatar-uploader{
//     width: 100px;
//     height: 100px;
//     border: 1px dashed #ccc;
//     display: inline-flex;
//     /* text-align: center; */
//     /* line-height: 100px; */
//     justify-content: center;
//     align-items: center;
// }
.avatar-uploader-icon {
    font-size: 48px;
    width: 100px;
    height: 100px;
    border: 1px dashed #ccc;
    display: inline-flex;
    /* text-align: center; */
    /* line-height: 100px; */
    justify-content: center;
    align-items: center;
}
</style>
  