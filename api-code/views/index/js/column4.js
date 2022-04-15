layui.use(['echarts', 'jquery'], function () {
	let echarts = layui.echarts;
	let $ = layui.jquery

	function init(cates, totals) {
		var column4 = echarts.init(document.getElementById('column4'));
		option = {
			backgroundColor: '#fff',
			title: {
				// text: "当前各分类总数",
				top: 10,
				left: 15,
				textStyle: {
					color: "#35598d",
					fontSize: 16,
					fontWeight: 'normal'
				}
			},
			tooltip: {
				trigger: 'axis',
				formatter: '{b}：{c}',
			},
			grid: {
				left: '5%',
				right: '6%',
				bottom: '3%',
				top: '20%',
				containLabel: true
			},
			xAxis: {
				type: 'category',
				data: totals,
				axisLabel: {          //坐标轴字体颜色
					textStyle: {
						color: '#9eaaba'
					}
				},
				axisLine: {
					lineStyle: {
						color: "#e5e5e5"
					}
				},
				axisTick: {       //y轴刻度线
					show: false
				},
				splitLine: {    //网格
					show: false,

				}
			},
			yAxis: {
				type: 'value',
				axisLabel: {        //坐标轴字体颜色
					textStyle: {
						color: '#9eaaba'
					}
				},
				axisLine: {
					show: false,
				},
				axisTick: {       //y轴刻度线
					show: false
				},
				splitLine: {    //网格
					show: true,
					lineStyle: {
						color: '#dadde4',
						type: "dashed" //坐标网线类型
					}
				}
			},
			series: {
				name: '',
				type: 'bar',
				barWidth: '40%',  //柱子宽度
				itemStyle: {  //柱子颜色
					normal: {
						borderWidth: 2,
						borderColor: 'rgb(79, 116, 223)',
						color: 'rgba(79, 116, 223, .3)',
					}
				},
				data: cates
			}
		};

		column4.setOption(option);

		window.onresize = function () {
			column4.resize();
		}
	}

	function inits(cates,totals) {
		var line3 = echarts.init(document.getElementById('line3'));

		const colorList = ["#9E87FF", '#73DDFF', '#fe9a8b', '#F56948', '#9E87FF']

		option = {
			backgroundColor: '#fff',
			title: {
				text: "告警数",
				left: "18px",
				top: "0",
				textStyle: {
					color: "#999",
					fontSize: 12,
					fontWeight: '400'
				}
			},
			color: ['#73A0FA', '#73DEB3', '#FFB761'],
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'cross',
					crossStyle: {
						color: '#999'
					},
					lineStyle: {
						type: 'dashed'
					}
				}
			},
			grid: {
				left: '25',
				right: '25',
				bottom: '24',
				top: '75',
				containLabel: true
			},
			legend: {
				data: ['上周', '本周'],
				orient: 'horizontal',
				icon: "rect",
				show: true,
				left: 20,
				top: 25,
			},
			xAxis: {
				type: 'category',
				data: totals,
				splitLine: {
					show: false
				},
				axisTick: {
					show: false
				},
				axisLine: {
					show: false
				},
			},
			yAxis: {
				type: 'value',
				axisLabel: {
					color: '#999',
					textStyle: {
						fontSize: 12
					},
				},
				splitLine: {
					show: true,
					lineStyle: {
						color: '#F3F4F4'
					}
				},
				axisTick: {
					show: false
				},
				axisLine: {
					show: false
				},
			},
			series: [{
				name: '上周',
				type: 'line',
				smooth: true,
				data: cates
			},
			{
				name: '本周',
				type: 'line',
				smooth: true,
				data: cates
			}
			]
		};

		line3.setOption(option);

		window.onresize = function () {
			line3.resize();
		}
	}

	$.get('/getVisual').then(function (data) {
		let cates = [];
		let totals = [];
		data.data.forEach(item => {
			cates.push(item.count)
			totals.push(item.cl_name)
		})
		init(cates, totals);
		inits(cates,totals)
	})
})
