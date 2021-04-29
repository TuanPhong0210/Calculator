var uutien=0; // phep tinh uu tien

var doi_dau_phep_tinh = false;
// vua ket thuc  phep tinh
var ketthuc=false;

// an dau phay 
var dauphay= false;


 //mang ghi nho so hang
var mang_so_lon_nhat=0;  //ghi so phan tu nhat nhat vd: 5 gan lai 4, khi click
var mang_so= new Array(); 
// ghi nho phep tinh cu neu co thay doi phep tinh
var pheptinhcu='';
// doi phep tinh + - X /
var doi_dau=false;

//mang ghi nho phep tinh + - x /
var mang_pt_index=0;  
var mang_pt= new Array();


//  ketqua 
var ketqua=document.getElementById('KQ'); // tra du lieu   về phần tử có thuộc tính ID được cung cấp o html

var ketquaStr = "";  // chuoi cu la 0; 

//tao phim an moi, cho la rong
var phim=""; // an 1 se luu  1, tiep tuc an 5 se luu 5, sao do cong voi ketquaSTR laf rong = 15
//xu ly su kien
function Clickbutton(obj){
  if(ketthuc){
        ketthuc.value=' ';
        ketthuc=false;
    }
// chuoi cua kq hien tai 


if(ketquaStr=="" && phim==""){
    ketquaStr=ketqua.value; // kq.value la du lieu so tra ve
}
if(ketquaStr=='0'){
    ketquaStr="";
}




var type = obj.innerHTML; ;//"set" (truyền vào) nội dung mới cho phần tử, obj = this 
    
 // dieu kien so
 if( type=='0'||
    type=='1' || 
    type=='2' ||
    type=='3' ||
    type=='4' ||
    type=='5' || 
    type=='6' ||
    type=='7' ||
    type=='8' ||
    type=='9' ||
    type=='-/+' ||
    type=='.' )
    {
        console.log(mang_so);
        doi_dau_phep_tinh = false; // xay ra an so se thanh false lien
    // doi dau
    if( type=='-/+'){
        // tru thanh cong
        if(doi_dau){
            doi_dau=false; 
          phim = phim.substring(1);

        }else{
            // cong thanh tru
        doi_dau=true;
            phim='-'+ phim;
        }
        
    }
    
    //dau cham
    else
    {
        if(type=='.' ){
            if(dauphay == true){
                return false;
            }
            dauphay=true;
            
        }
        phim+= type; // khi an phim , tuong ung voi  so
    }
    // thay doi hien thi
    ketqua.value = ketquaStr+phim.replace(/^""+/, ''); // lay du lieu kq innerHTML = phim cu(la phim an dau tien) + phim moi bam 
    // Thuc hien phep tinh
}
else if
(type=='+'||
type=='-' || 
type=='x'||
type=='/'

){

    dauphay=false;
    // truoc do da nhan 1 phep tinh, sau do doi lai
    if(doi_dau_phep_tinh){
        //neu phep tinh cu la uu tien , nhung phep tinh moi khong uu tien
        if((pheptinhcu=='x'|| pheptinhcu=='/') && (type=='+'|| type=='-')){
            uutien--;
        }
        // neu phep tinh cu khong uu tien nhung phep tinh moi co uu tien
         if((pheptinhcu=='+'|| pheptinhcu=='-') && (type=='x'|| type=='/')){// khi thay the dau
            uutien++; 
        }
        mang_pt[mang_pt_index-1]=type; // do khi an phep tinh da cong len 1, [11+ (+)] , tru 1, [11]
        // hien thi
        ketqua.value=ketqua.value.substring(0,keq.value.length-1) +type; // cat chuoi tu vi tri 0 den vi tri lenght -1 , sao do cong lai phep tinh type
    

    
    }else{
        //ghi nho phep tinh
        pheptinhcu=type;
         // chua co phep tinh // luu vao mang so
        mang_so[mang_so_lon_nhat]=parseFloat(phim); // luu gia tri so khi an phim, chuyen sang Float khi an phiem
        mang_so_lon_nhat++; 
        // luu phep tinh vao mang
        mang_pt[mang_pt_index]=type;// luu phep tinh type
        mang_pt_index++;
            // hien thi
            ketqua.value=ketqua.value +type;
            // cong so diem uu tieen // nhu 1+ 2x 3 => (0 1 2) vt 0( gia tri 1) vt 1(gia tri6)
            if(type=='x' || type == '/'){
                uutien++;
            }
    }
    // ghi nho da bam phep tinh
    doi_dau_phep_tinh=true;
    // doi 2 gia tri tro ve rong( de an phim tiep theo)
    ketquaStr = ""; 
    phim=""; 
}
// Phim = , %
else if(
    type=='=' || type=='%'
)
{
    ketthuc=true;

if(phim!=''){
    mang_so[mang_so_lon_nhat]=  parseFloat(phim);
} 
// dau bang
if(type=='='){
// ham tinh
 daubang();
}
// dau %
else{
    // ham tinh
    phantram();
}
  //reset
  ketquaStr = ' '; 
  phim=' '; 
  mang_so=new Array;
  mang_pt=new Array;
  mang_pt_index=0;
  mang_so_lon_nhat=0;
  uutien=0;
}
// CE
else if(type=='CE'){
    phim='';
    ketqua.value =0;
    dauphay=false;
}
//DE
else {
    dauphay=false;
    if(phim.length>1){
        phim=phim.substring(0,phim.length-1);
        ketqua.value =ketquaStr+phim;
    }else {
        phim='';
        ketqua.value = 0;
        
    }
    // xu li hien thi
    
}

}
// phim %
function phantram(){
    mang_pt_index --;
    dauphay=false;
   
    // kiem tra mang so  chi co 2 phan tu va phan tu thu 2 khac 0 (1/ 5) so 5 phai khac 0
    if(mang_so_lon_nhat!=1 || mang_so[1]==0)  // vi tri mang so 1 la phan tu thu 2
    {
    ketqua.value="0"; // luu phan tu la 0
    }
    // phai co 1 phep tinh
    else if(mang_pt_index!=0){
        ketqua.value="0";
    }
    // phep tinh phai la phep chia
    else if(mang_pt[0]!= '/'){ 
        ketqua.value="0";
    }
    // thoa tat ca dieu kien
    else{
        var R_kq =mang_so[0] / mang_so[1] * 100;
        ketqua.value= R_kq;
    }
  
}
function daubang(){
    dauphay=false;
    mang_pt_index --;
    // tinh uu tien
    while (uutien>0){
        for(var index=0;index <=mang_pt_index;index++){
            if(mang_pt[index]=='x'|| mang_pt[index]=='/'){
                var so1=mang_so[index];
                var so2=mang_so[index+1];
                var tmp=0;
                // tinh ket qua phep tinh duoc uu tien
                if(mang_pt[index]=='x'){
                tmp=so1* so2;   
                 }
                else if(so2==0){
                ketqua.value='0';
                }
                else {
                tmp=so1 / so2;
                }
                // thay the so hang 
                mang_so[index]=tmp;
               // gan vtri 1 bang vtr 2 , gan 2 = 3 [ 0 1+ 2 3] gan vi tri da cong vao (1+2), va gan(1+2) vao a[2]
                for(var new_index=index+1;new_index < mang_so_lon_nhat;new_index++){
                    mang_so[new_index]=mang_so[new_index+1];
                }
                mang_so_lon_nhat--;
                // xoa bo phep tinh 
                for(var new_index=index;new_index < mang_pt_index;new_index++){
                    mang_pt[new_index]=mang_pt[new_index+1];
                }
                mang_pt_index--;

                // xoa ghi nho uu tien
                uutien--;
                // ngat vong lap for do phan tu da bi xoa.
                break;
                
            }
        }
    }
    // phep tinh thuong ko co x , /
    while(mang_so_lon_nhat>0){ // neu = 0 chi con 1 ptu duy nhat
        // lay so hang
        var so1=mang_so[0];
        var so2=mang_so[1];
        var tmp=0;
        // phep tinh
        if(mang_pt[0]=='+'){
            tmp=so1+so2;
        }
        if(mang_pt[0]=='-'){
            tmp=so1-so2;
        }
        // thay the so hang
        mang_so[0]=tmp;
               // don so hang // gan vtri 1 bang vtr 2 , gan 2 = 3 [ 0 1+ 2 3] gan vi tri da cong vao (1+2), va gan(1+2) vao a[2]
        for(var new_index=1;new_index<mang_so_lon_nhat;new_index++){
            mang_so[new_index]=mang_so[new_index+1];
        }
        mang_so_lon_nhat--;
        // xoa bo phep tinh 
        for(var new_index=0;new_index<mang_pt_index;new_index++){
            mang_pt[new_index]=mang_pt[new_index+1];
        }
        mang_pt_index--;
    }
    // in kq
    ketqua.value=mang_so[0];
}