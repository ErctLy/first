class Moyu{
	constructor(width,name) {
		this.width = width
		this.name = name
		this.SIDE = 32
	}	
	initVideo(){
		let video = document.createElement("video")
		video.width = this.width
		video.controls = "controls"
		video.src = "./video/"+this.name+".mp4"
		video.crossOrigin = "anonymous"
		video.autoplay = "autoplay"
		document.body.appendChild(video)
		
		this.video = video
		this.bindVideoEvents()
	}
	init(){
		this.initVideo()
		this.initCanvas()
	}
	initCanvas(){
		this.canvas = document.createElement("canvas")
		this.canvas.width = this.canvas.height = this.SIDE
	}
	bindVideoEvents(){
		this.video.addEventListener("timeupdate",()=>{
			this.videoToImage()
		},false)
	}
	videoToImage(){
		const context = this.canvas.getContext('2d')
		context.clearRect(0,0,this.SIDE,this.SIDE)
		context.drawImage(this.video,0,0,this.SIDE,this.SIDE)
		// document.getElementById('img').src = this.canvas.toDataURL('image/png') 
		this.setFavico()
	}
	setFavico(){
		const url = this.canvas.toDataURL('image/png') 
		let icons = [...document.querySelector('head').querySelectorAll('link')]
								.filter(link=>{
									const rel = link.getAttribute('rel') || ''
									return rel.indexOf('icon')>-1
								})
		if(icons.length){
			icons.forEach(icon=>icon.setAttribute('href',url))
		}else{
			const icon = document.createElement('link')
			icon.setAttribute('rel','icon')
			icon.setAttribute('href',url)
			document.querySelector('head').appendChild(icon)
		}
	}
}

const m = new Moyu('0','hqlm')
m.init()
