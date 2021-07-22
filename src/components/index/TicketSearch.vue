<template>
  <div style="height: 100px">
    <el-row :gutter="20">
      <el-col :span="2">
        <span>类型</span>
        <el-select v-model="type">
          <el-option label="单程" value="单程" key="单程"></el-option>
          <el-option label="往返" value="往返" key="往返"></el-option>
        </el-select>
      </el-col>
      <el-col :span="3">
        <div class="block">
          <span>出发地</span>
          <el-select v-model="dcity" filterable placeholder="出发地">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="2">
        <div style="background-color: #42b983;margin-top: 20px" @click="exchange()">
          <i class="el-icon-arrow-left" style="height: 30px;margin-top: 10px;background-color: #42b983"></i>
          <i class="el-icon-arrow-right" style="height: 30px;margin-top: 10px;background-color: #42b983"></i>
        </div>
      </el-col>
      <el-col :span="5">
        <span>到达地</span>
        <el-select v-model="acity" filterable placeholder="到达地">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="5">
        <span>出发日期</span>
        <el-date-picker
          v-model="ddate"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-col>
      <el-col :span="5">
        <span>返程日期</span>
        <el-date-picker
          v-model="adate"
          align="right"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions">
        </el-date-picker>
      </el-col>
      <el-col :span="2">
        <el-button style="width: 100%;height:40px;margin-top: 20px" @click="search">搜索</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'searcher',
  data () {
    return {
      options: [{value: '阿尔山', label: '阿尔山'}, {value: '阿克苏', label: '阿克苏'}, {value: '阿拉善右旗', label: '阿拉善右旗'}, {value: '阿拉善左旗', label: '阿拉善左旗'}, {value: '阿勒泰', label: '阿勒泰'}, {value: '阿里', label: '阿里'}, {value: '澳门', label: '澳门'}, {value: '安庆', label: '安庆'}, {value: '安顺', label: '安顺'}, {value: '鞍山', label: '鞍山'}, {value: '巴彦淖尔', label: '巴彦淖尔'}, {value: '百色', label: '百色'}, {value: '包头', label: '包头'}, {value: '保山', label: '保山'}, {value: '北海', label: '北海'}, {value: '北京', label: '北京'}, {value: '白城', label: '白城'}, {value: '白山', label: '白山'}, {value: '毕节', label: '毕节'}, {value: '博乐', label: '博乐'}, {value: '重庆', label: '重庆'}, {value: '昌都', label: '昌都'}, {value: '常德', label: '常德'}, {value: '常州', label: '常州'}, {value: '朝阳', label: '朝阳'}, {value: '成都', label: '成都'}, {value: '池州', label: '池州'}, {value: '赤峰', label: '赤峰'}, {value: '揭阳', label: '揭阳'}, {value: '长春', label: '长春'}, {value: '长沙', label: '长沙'}, {value: '长治', label: '长治'}, {value: '承德', label: '承德'}, {value: '沧源', label: '沧源'}, {value: '达县', label: '达县'}, {value: '大理', label: '大理'}, {value: '大连', label: '大连'}, {value: '大庆', label: '大庆'}, {value: '大同', label: '大同'}, {value: '丹东', label: '丹东'}, {value: '稻城', label: '稻城'}, {value: '东营', label: '东营'}, {value: '敦煌', label: '敦煌'}, {value: '芒市', label: '芒市'}, {value: '额济纳旗', label: '额济纳旗'}, {value: '鄂尔多斯', label: '鄂尔多斯'}, {value: '恩施', label: '恩施'}, {value: '二连浩特', label: '二连浩特'}, {value: '佛山', label: '佛山'}, {value: '福州', label: '福州'}, {value: '抚远', label: '抚远'}, {value: '阜阳', label: '阜阳'}, {value: '赣州', label: '赣州'}, {value: '格尔木', label: '格尔木'}, {value: '固原', label: '固原'}, {value: '广元', label: '广元'}, {value: '广州', label: '广州'}, {value: '贵阳', label: '贵阳'}, {value: '桂林', label: '桂林'}, {value: '哈尔滨', label: '哈尔滨'}, {value: '哈密', label: '哈密'}, {value: '海口', label: '海口'}, {value: '海拉尔', label: '海拉尔'}, {value: '邯郸', label: '邯郸'}, {value: '汉中', label: '汉中'}, {value: '杭州', label: '杭州'}, {value: '合肥', label: '合肥'}, {value: '和田', label: '和田'}, {value: '黑河', label: '黑河'}, {value: '呼和浩特', label: '呼和浩特'}, {value: '淮安', label: '淮安'}, {value: '怀化', label: '怀化'}, {value: '黄山', label: '黄山'}, {value: '惠州', label: '惠州'}, {value: '鸡西', label: '鸡西'}, {value: '济南', label: '济南'}, {value: '济宁', label: '济宁'}, {value: '加格达奇', label: '加格达奇'}, {value: '佳木斯', label: '佳木斯'}, {value: '嘉峪关', label: '嘉峪关'}, {value: '金昌', label: '金昌'}, {value: '金门', label: '金门'}, {value: '锦州', label: '锦州'}, {value: '嘉义', label: '嘉义'}, {value: '西双版纳', label: '西双版纳'}, {value: '建三江', label: '建三江'}, {value: '晋江', label: '晋江'}, {value: '井冈山', label: '井冈山'}, {value: '景德镇', label: '景德镇'}, {value: '九江', label: '九江'}, {value: '九寨沟', label: '九寨沟'}, {value: '喀什', label: '喀什'}, {value: '凯里', label: '凯里'}, {value: '康定', label: '康定'}, {value: '克拉玛依', label: '克拉玛依'}, {value: '库车', label: '库车'}, {value: '库尔勒', label: '库尔勒'}, {value: '昆明', label: '昆明'}, {value: '拉萨', label: '拉萨'}, {value: '兰州', label: '兰州'}, {value: '黎平', label: '黎平'}, {value: '丽江', label: '丽江'}, {value: '荔波', label: '荔波'}, {value: '连云港', label: '连云港'}, {value: '六盘水', label: '六盘水'}, {value: '临汾', label: '临汾'}, {value: '林芝', label: '林芝'}, {value: '临沧', label: '临沧'}, {value: '临沂', label: '临沂'}, {value: '柳州', label: '柳州'}, {value: '泸州', label: '泸州'}, {value: '洛阳', label: '洛阳'}, {value: '吕梁', label: '吕梁'}, {value: '澜沧', label: '澜沧'}, {value: '龙岩', label: '龙岩'}, {value: '满洲里', label: '满洲里'}, {value: '梅州', label: '梅州'}, {value: '绵阳', label: '绵阳'}, {value: '漠河', label: '漠河'}, {value: '牡丹江', label: '牡丹江'}, {value: '马祖', label: '马祖'}, {value: '南昌', label: '南昌'}, {value: '南充', label: '南充'}, {value: '南京', label: '南京'}, {value: '南宁', label: '南宁'}, {value: '南通', label: '南通'}, {value: '南阳', label: '南阳'}, {value: '宁波', label: '宁波'}, {value: '宁蒗', label: '宁蒗'}, {value: '攀枝花', label: '攀枝花'}, {value: '普洱', label: '普洱'}, {value: '齐齐哈尔', label: '齐齐哈尔'}, {value: '黔江', label: '黔江'}, {value: '且末', label: '且末'}, {value: '秦皇岛', label: '秦皇岛'}, {value: '青岛', label: '青岛'}, {value: '庆阳', label: '庆阳'}, {value: '衢州', label: '衢州'}, {value: '日喀则', label: '日喀则'}, {value: '日照', label: '日照'}, {value: '三亚', label: '三亚'}, {value: '厦门', label: '厦门'}, {value: '上海', label: '上海'}, {value: '深圳', label: '深圳'}, {value: '神农架', label: '神农架'}, {value: '沈阳', label: '沈阳'}, {value: '石家庄', label: '石家庄'}, {value: '塔城', label: '塔城'}, {value: '台州', label: '台州'}, {value: '太原', label: '太原'}, {value: '扬州', label: '扬州'}, {value: '唐山', label: '唐山'}, {value: '腾冲', label: '腾冲'}, {value: '天津', label: '天津'}, {value: '天水', label: '天水'}, {value: '通辽', label: '通辽'}, {value: '铜仁', label: '铜仁'}, {value: '吐鲁番', label: '吐鲁番'}, {value: '万州', label: '万州'}, {value: '威海', label: '威海'}, {value: '潍坊', label: '潍坊'}, {value: '温州', label: '温州'}, {value: '文山', label: '文山'}, {value: '乌海', label: '乌海'}, {value: '乌兰浩特', label: '乌兰浩特'}, {value: '乌鲁木齐', label: '乌鲁木齐'}, {value: '无锡', label: '无锡'}, {value: '梧州', label: '梧州'}, {value: '武汉', label: '武汉'}, {value: '武夷山', label: '武夷山'}, {value: '西安', label: '西安'}, {value: '西昌', label: '西昌'}, {value: '西宁', label: '西宁'}, {value: '锡林浩特', label: '锡林浩特'}, {value: '香格里拉(迪庆)', label: '香格里拉(迪庆)'}, {value: '襄阳', label: '襄阳'}, {value: '兴义', label: '兴义'}, {value: '徐州', label: '徐州'}, {value: '香港', label: '香港'}, {value: '烟台', label: '烟台'}, {value: '延安', label: '延安'}, {value: '延吉', label: '延吉'}, {value: '盐城', label: '盐城'}, {value: '伊春', label: '伊春'}, {value: '伊宁', label: '伊宁'}, {value: '宜宾', label: '宜宾'}, {value: '宜昌', label: '宜昌'}, {value: '宜春', label: '宜春'}, {value: '义乌', label: '义乌'}, {value: '银川', label: '银川'}, {value: '永州', label: '永州'}, {value: '榆林', label: '榆林'}, {value: '玉树', label: '玉树'}, {value: '运城', label: '运城'}, {value: '湛江', label: '湛江'}, {value: '张家界', label: '张家界'}, {value: '张家口', label: '张家口'}, {value: '张掖', label: '张掖'}, {value: '昭通', label: '昭通'}, {value: '郑州', label: '郑州'}, {value: '中卫', label: '中卫'}, {value: '舟山', label: '舟山'}, {value: '珠海', label: '珠海'}, {value: '遵义(茅台)', label: '遵义(茅台)'}, {value: '遵义(新舟)', label: '遵义(新舟)'}],
      dcity: '',
      acity: '',
      ddate: '',
      adate: '',
      type: '',
      pickerOptions: {
        disabledDate (time) {
          return time.getTime() < Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick (picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick (picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      }
    }
  },
  methods: {
    exchange () {
      var temp = this.dcity
      this.dcity = this.acity
      this.acity = temp
    },
    search () {
      console.log(this.ddate)
      this.$router.push({name: 'ticketResult', query: {dcity: this.dcity, acity: this.acity, ddate: this.ddate}})
    }
  }
}
</script>

<style scoped>

</style>
