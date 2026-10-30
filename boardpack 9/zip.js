/* ZIP STORE writer: UTF-8 names, CRC32, no external dependencies. */
(function(root){
const table=Uint32Array.from({length:256},(_,n)=>{for(let j=0;j<8;j++)n=n&1?0xedb88320^(n>>>1):n>>>1;return n>>>0});
function crc32(bytes){let c=0xffffffff;for(const b of bytes)c=table[(c^b)&255]^(c>>>8);return (c^0xffffffff)>>>0}
function header(size,values){const b=new Uint8Array(size),v=new DataView(b.buffer);for(const [offset,value,width]of values)width===2?v.setUint16(offset,value,true):v.setUint32(offset,value,true);return b}
function makeZip(files){if(files.length>65535)throw Error('Too many files in one ZIP');let offset=0;const chunks=[],central=[];for(const f of files){const name=new TextEncoder().encode(f.name),data=f.data,crc=crc32(data);const h=header(30,[[0,0x04034b50,4],[4,20,2],[6,0x800,2],[14,crc,4],[18,data.length,4],[22,data.length,4],[26,name.length,2]]);chunks.push(h,name,data);central.push(header(46,[[0,0x02014b50,4],[4,20,2],[6,20,2],[8,0x800,2],[16,crc,4],[20,data.length,4],[24,data.length,4],[28,name.length,2],[42,offset,4]]),name);offset+=30+name.length+data.length}const size=central.reduce((s,b)=>s+b.length,0);return new Blob([...chunks,...central,header(22,[[0,0x06054b50,4],[8,files.length,2],[10,files.length,2],[12,size,4],[16,offset,4]])],{type:'application/zip'})}
root.makeZip=makeZip;if(typeof module!=='undefined')module.exports={makeZip,crc32};
})(globalThis);
