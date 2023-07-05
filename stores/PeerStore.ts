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
export const useMessageStore = definePiniaStore("chatMessageStore", {
  // a function that returns a fresh state
  state: () => {
    let user=""
    let peer=new Peer();
    let distpeers=[] as DistPeer[];
    return {
      user,
      peer,
      distpeers
    };
  },
  // optional actions
  actions: {
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
      let peer = new Peer;
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
