export class Start extends Phaser.Scene {

    constructor() {
        super('Start');
    }

    preload() {
        this.load.image('background', 'assets/black.png');
        this.load.image('logo', 'assets/logo.png');
        this.load.image('dust','assets/dust.png')
        this.load.image('heart','assets/redHeart.png')
        this.load.image('hostb','assets/HOST.png')
        this.load.image('joinb','assets/JOIN.png')
        this.load.image('copyb','assets/copied.png')
        this.load.image('startb','assets/START.png')
        this.load.audio('radar', 'assets/MettaRadar.mp3')
        this.load.audio('mystical', 'assets/mystical.mp3')
        this.load.audio('copy', 'assets/save.wav')


        

        function Notif(){
                this.copyfx.play()
            
        }

        //  The ship sprite is CC0 from https://ansimuz.itch.io - check out his other work!
        this.load.spritesheet('ship', 'assets/spaceship.png', { frameWidth: 176, frameHeight: 96 });
    }

    create() {
        this.background = this.add.tileSprite(640, 360, 1280, 720, 'background');
        this.mus = this.sound.add('radar');
        this.muswait = this.sound.add('mystical');
        this.copyfx = this.sound.add('copy')

        peer.on('connection', function(c){
            this.copyfx.play
                //connections.push(c)
                this.conn.on('open', function(){
                    this.copyfx.play
                })
            })
        this.mus.play({loop:true,
                        volume: .5,
                        detune: 20})

        const logo = this.add.image(640, 200, 'logo');
        this.particles = this.add.particles(0,720, 'dust',
        {
        alpha: {start:.7, end:0},
        scale: {min: .2, max: .5},
        accelerationY: -50,
        maxVelocityY: 200,
        lifespan:9000,
        frequency: 200,
        x:{ min: 0, max: 1280 },
        accelerationX: {min: -30, max: 30},
        maxVelocityX: 50})


        const heart = this.add.sprite(640, 360, 'heart', {scale: .2});



        this.tweens.add({
            targets: heart,
            y: 400,
            duration: 1500,
            ease: 'Sine.inOut',
            yoyo: true,
            loop: -1
        });
        this.hostButton = this.add.sprite(640 - 300,550,"hostb")
        this.hostButton.setScale(.8,.5)
        this.hostButton.setInteractive();
        this.hostButton.state=0
        this.joinButton = this.add.sprite(640 + 300,550,"joinb")
        this.joinButton.setScale(.8,.5)
        this.joinButton.setInteractive();
        this.joinButton.state=0
        this.hostButton.on('pointerdown', ()=>{
            console.log(this.hostButton.state)
            if(this.hostButton.state==0){
                this.hostButton.setTexture('copyb')
                this.joinButton.setTexture('startb')
                this.joinButton.state = 3
                this.muswait.play({loop:true,
                                    volume: .5,
                                    detune: 20})
                this.mus.stop()
                this.hostButton.state = 1
                this.copyfx.play()
                console.log(this.hostButton.state)
                role = "host"
                navigator.clipboard.writeText(peer.id)
            }
            
        })
        this.joinButton.on('pointerdown', ()=>{
            //console.log(this.hostButton.state)
            if(this.joinButton.state==0){
                let p = prompt("Copy the host ID you would like to join:")
                if(p != null){
                    role = "client"
                    peer.connect(p)
                    p.send({"type": "greeting", "content":peer.id})
                }else{

                }
            }
            if(this.joinButton.state==3){
                this.scene.stop("Start")
                this.scene.start("game")
            }
            
        })

        this.hostButton.on('pointerover', ()=>{
           this.txt = this.add.text(100,100, "*click this to copy a\ncode for others to join your game!",{fill: 'rgb(0,255,0)'})
        })
        this.hostButton.on('pointerout', ()=>{
           this.txt.visible = false
        })

        this.joinButton.on('pointerover', ()=>{
            if(this.joinButton.state==3){
                this.txt = this.add.text(100,100, "The button has changed...\nafter enough people join\nyour game, click this to begin!",{fill: 'rgb(0,255,0)'})
            }
        })
        this.joinButton.on('pointerout', ()=>{
           this.txt.visible = false
        })

    
    }

    update() {
        if(this.hostButton.state>0 && this.hostButton.state <2){
            this.hostButton.state +=.03
        }
        if(this.hostButton.state>=2){
            this.hostButton.setTexture("hostb")
            this.hostButton.state = 0
        }
        this.background.tilePositionX += 2;
    }
    
}
