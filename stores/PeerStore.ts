import { Link } from './../.nuxt/components.d';
// main is the name of the store. It is unique across your application

import Peer, { DataConnection } from "peerjs";

class DistPeer{
  id:string;
  user:string|undefined;
  conn: DataConnection|undefined;
  constructor(id:string,user:string){
    this.id=id;
    this.user=user;
  }

}
// and will appear in devtools
export const usePeerStore = definePiniaStore("peerStore", {
  // a function that returns a fresh state
  state: () => {
    let user=""
    let peer=new Peer();
    let peerId=""
    let distpeers=[] as DistPeer[];
    let isInit=false;
    return {
      user,
      peer,
      distpeers,
      isInit,
      peerId
    };
  },
  // optional actions
  actions: {
    getPeerId(){
      console.log(this)
      return this.peerId;
    },
    init(user:string){
      this.user=user;
      this.peer=this.createPeer();
      this.isInit=true;
      alert("初始化成功")
      //alert(this.peer.id)
    },
    link(distPeerId:string){
      const conn = this.peer.connect(distPeerId);
      conn.on('open', ()=> {
        // Receive messages
        conn.on('data', function(data) {
          console.log('Received', data);
        });
        // Send messages
        let linkMessage={type:"link",user:this.user,distPeerId:this.peer.id,conn:conn}
        conn.send(linkMessage);
        });
    },
    receive(data:any){
      if (data.type=="link"){
         const distPeer= new DistPeer(data.distPeerId,data.user);
         distPeer.conn=data.conn;
         let conn=data.conn;
         this.distpeers.push(distPeer);
         let linkMessage={type:"linkBack",user:this.user,distPeerId:this.peer.id,conn:conn}
         conn.send(linkMessage);
         console.log(data.user+"linked,id:"+data.distPeerId);
      };
      if (data.type=="linkBack"){
        const distPeer= new DistPeer(data.distPeerId,data.user);
        distPeer.conn=data.conn;
        let conn=data.conn;
        this.distpeers.push(distPeer);
        console.log(data.user+"linked,id:"+data.distPeerId);
      }
    },
    createPeer(){
      const peer = new Peer();
      peer.on('open',(id)=>{
        this.peerId=peer.id;
        console.log(peer)
        alert("peerid:"+peer.id)
      })
      peer.on('connection', (conn) =>{ 
        conn.on('open',()=> {
          // Receive messages
          conn.on('data', (data) =>{
            this.receive(data);
          });
          });
       });
    
      return peer;
    }

  },
});
