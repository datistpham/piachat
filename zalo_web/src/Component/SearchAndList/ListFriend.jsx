import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { GrClose } from 'react-icons/gr'
// import OutsideClickHandler from 'react-outside-click-handler'
import { useNavigate } from 'react-router-dom'
import delete_member_id from '../../api/coversation/delete_member_id'
import get_conversation_friends from '../../api/coversation/get_conversation_friends'
import make_conversation from '../../api/coversation/make_conversation'
// import get_list_friend_rebuild from '../../api/friend/get_list_friend_rebuild'
import unfriend from '../../api/friend/unfriend'
import Avatar from '../Home/Avatar'
import CoverPhoto from '../Home/CoverPhoto'
import { NameProfile } from '../Home/DetailProfile'
import { ImageItemList, Name } from './List'
import get_user from '../../api/admin/get_user'
import InfiniteScroll from 'react-infinite-scroll-component';
import { Dialog, DialogContent, DialogActions, Button as ButtonMui, CircularProgress } from '@mui/material';
import {makeStyles } from "@mui/styles"
import {  useSnackbar } from 'notistack'

const useStyles = makeStyles(() => ({
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100px', // Thay đổi chiều cao cần thiết để căn giữa loading
  },
}));
const ListFriend = (props) => {
  return (
    <div className={"skdjkfjdkdjsdas"}style={{width:" 100%", height: "calc(100% - 60px)", overflow: "auto"}}>
      {/* <RequestByMe /> */}
      {/* <RequestByUserToMe /> */}
      <ListFriendItem2 />
    </div>
  )
}

export const RequestByMe= (props)=> {
  const navigate= useNavigate()

  return (
    <div onClick={()=> navigate("/friends/request/to/me")} className={"fvjkldjaklsdjklasjassa fjsdjljkgjhdlsjhdas"} style={{width: "100%", padding: 16, display: "flex", alignItems: "center", gap: 10, cursor: "pointer"}}>
      <img src={"https://chat.zalo.me/assets/NewFr@2x.820483766abed8ab03205b8e4a8b105b.png"} alt="" style={{width: 48, height: 48, objectFit: "cover", borderRadius: "50%"}} />
      <div className={"fdjfkjkajawas"} style={{fontSize: 18}}>Danh sách kết bạn</div>
    </div>
  )
}

export const RequestByUserToMe= (props)=> {
  const navigate= useNavigate()

  return (
    <div onClick={()=> navigate("/friends/request/by/me")} className={"fvjkldjaklsdjklasjassa fjsdjljkgjhdlsjhdas"} style={{width: "100%", padding: 16, display: "flex", alignItems: "center", gap: 10, cursor: "pointer"}}>
      <img src={"https://chat.zalo.me/assets/group@2x.2d184edd797db8782baa0d5c7a786ba0.png"} alt="" style={{width: 48, height: 48, objectFit: "cover", borderRadius: "50%"}} />
      <div className={"fdjfkjkajawas"} style={{fontSize: 18}}>Danh sách yêu cầu kết bạn</div>
    </div>
  )
}

export const ListFriendItem= (props)=> {
  const [data, setData]= useState([])
  const [hasMore, setHasMore] = useState(true);
  // eslint-disable-next-line
  const [page, setPage] = useState(1);
  const [itemsToShow, setItemsToShow] = useState(10);
   // eslint-disable-next-line
  const {enqueueSnackbar }= useSnackbar()
  const classes = useStyles();
  const loadMoreData = () => {
    // Assuming you have 'data' array containing all the fetched data
    const totalItems = data.length;
    const nextItemsToShow = itemsToShow + 10; // Increase the number of items to show

    if (nextItemsToShow >= totalItems) {
      // If we have displayed all the data, disable infinite scroll
      setHasMore(false);
    }

    // Update the number of items to show
    setItemsToShow(nextItemsToShow);
  };

  useEffect(()=> {
    (async ()=> {
      const result= await get_user()
      let result1= result?.filter(item=> item?._id !== Cookies.get("uid"))
      if (!result1 || result1.length === 0) {
        setHasMore(false);
        return;
      }
      setPage(prevPage => prevPage + 1);
      return setData(result1)
    })()
  }, [])
  

  return (
    <>
      <div className={"fvjkldjaklsdjklasjassa fjsdjljkgjhdlsjhdas"} style={{width: "100%", padding: 16, display: "flex", alignItems: "center", gap: 10, cursor: "pointer"}}>
        <div style={{fontSize: 18}}>Danh sách người dùng trong công ty</div>
      </div>
      <div id="infiniteScrollContainer" style={{maxHeight: 300, overflow: "auto"}}>
      <InfiniteScroll
        dataLength={itemsToShow}
        next={loadMoreData}
        hasMore={hasMore}
        loader={<div className={classes.loadingContainer}>
          <CircularProgress color="primary" /> {/* Sử dụng CircularProgress của Material-UI */}
        </div>}
        scrollableTarget="infiniteScrollContainer" // Thay 'infiniteScrollContainer' bằng id của div cha
      >
        {data.slice(0, itemsToShow).map((item, index) => (
          <ListFriendComponent setArrayMember={props?.setArrayMember} arrayMember={props?.arrayMember} is_invite={props?.is_invite} key={index} {...item} />)
      )}
      </InfiniteScroll>
        {/* {
          data?.map((item, key)=> <ListFriendComponent setArrayMember={props?.setArrayMember} arrayMember={props?.arrayMember} is_invite={props?.is_invite} key={key} {...item} />)
        } */}
      </div>
    </>
  )
}

export const ListFriendItem2= (props)=> {
  const [data, setData]= useState()
   // eslint-disable-next-line
  const [open, setOpen]= useState(false)

  useEffect(()=> {
    (async ()=> {
      const result= await get_user()
      let result1= result?.filter(item=> item?._id !== Cookies.get("uid"))
      if (!result1 || result1.length === 0) {
        return;
      }
      return setData(result1)
    })()
  }, [])

  return (
    <>
      <div onClick={()=> setOpen(prev=> !prev)} className={"fvjkldjaklsdjklasjassa fjsdjljkgjhdlsjhdas"} style={{width: "100%", padding: 16, display: "flex", alignItems: "center", gap: 10, cursor: "pointer"}}>
        <div style={{fontSize: 18}}>Danh sách người dùng</div>
      </div>
      {
        data?.map((item, key)=> <ListFriendComponent2 setArrayMember={props?.setArrayMember} arrayMember={props?.arrayMember} is_invite={props?.is_invite} key={key} {...item} />)
      }
    </>
  )
}

export const ListFriendComponent= (props)=> {
   // eslint-disable-next-line
  const [open, setOpen]= useState(()=> false)
  const [open2, setOpen2]= useState(()=> false)
  const {enqueueSnackbar }= useSnackbar()

  return (
    <div onClick={()=> setOpen(prev=> !prev)} className={"fjsdjljkgjhdlsjhdas"} style={{width: "100%", padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer"}}>
        {/* s1 */}
        <div>
          <div onClick={()=> setOpen2(!open2)} className={"jskdjksjkgfddas"} style={{display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10}}>
              <ImageItemList {...props } imageGroup={props?.profilePicture?.length > 0 ? props?.profilePicture : "https://forum.truckersmp.com/uploads/monthly_2022_05/imported-photo-240240.thumb.png.974ffed93b3286f4e60938fb8c7ec38e.png"} />
              <Name {...props} label={props?.username} />
              {
                props?.is_group=== true && <>
                  {
                    props?.isHostGroup=== true && (props?._id === props?.my_id) && <div>(Bạn)</div>
                  }
                  {
                    props?.isHostGroup=== false && (props?._id === props?.my_id) && <div>(Bạn)</div>
                  }
                </>
              }
          </div>
        </div>
        {/* s2 */}
        <div className={"fjklsjklfjsksajas"} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            {
              props?.is_invite=== true && props?.arrayMember?.includes(props?._id) && <>
              <Button onClick={(e)=> {
                e.stopPropagation()
                props?.setArrayMember(prev=> [...prev, props?._id])
              }} disabled={props?.arrayMember?.includes(props?._id) ? true : false} variant={"primary"}>{"Đã thêm"}</Button>
              <Button style={{marginLeft: 8}} onClick={(e)=> {
                props?.setArrayMember(props?.arrayMember?.filter(item=> item?.trim() !== props?._id?.trim()))
              }}  variant={"secondary"}>{"Xóa"}</Button>
              </>
            }
            {
              props?.is_invite=== true && !props?.arrayMember?.includes(props?._id) && <Button onClick={(e)=> {
                e.stopPropagation()
                props?.setArrayMember(prev=> [...prev, props?._id])
              }} disabled={props?.arrayMember?.includes(props?._id) ? true : false} variant={"primary"}>{"Thêm"}</Button>
            }
            {
              props?.is_group=== true && props?.isHostGroup=== true  && (props?._id !== props?.my_id) && <>
                <Button onClick={async (e)=> {
                  e.stopPropagation()
                  await delete_member_id(props?._id, props?.id_conversation, props?.setResult)
                  .then(()=> {
                    enqueueSnackbar("Xóa thành công", {
                      variant: "error"
                    })
                  })
                  }} color={"primary"} style={{whiteSpace: "nowrap"}}>Xóa thành viên</Button>
              </>
            }            
        </div>
        {/* {<PopupAddFriends open={open2} setOpen={setOpen2} {...props} />} */}
    </div> 
  )
}

export const ListFriendComponent2= (props)=> {
   // eslint-disable-next-line
  const [open, setOpen]= useState(()=> false)
  const [open2, setOpen2]= useState(()=> false)
  const {enqueueSnackbar }= useSnackbar()

  return (
    <div onClick={()=> setOpen(prev=> !prev)} className={"fjsdjljkgjhdlsjhdas"} style={{width: "100%", padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer"}}>
        {/* s1 */}
        <div>
          <div onClick={()=> setOpen2(!open2)} className={"jskdjksjkgfddas"} style={{display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10}}>
              <ImageItemList {...props } imageGroup={props?.profilePicture?.length > 0 ? props?.profilePicture : "https://forum.truckersmp.com/uploads/monthly_2022_05/imported-photo-240240.thumb.png.974ffed93b3286f4e60938fb8c7ec38e.png"} />
              <Name {...props} label={props?.username} />
              {
                props?.is_group=== true && <>
                  {
                    props?.isHostGroup=== true && (props?._id === props?.my_id) && <div>(Bạn)</div>
                  }
                  {
                    props?.isHostGroup=== false && (props?._id === props?.my_id) && <div>(Bạn)</div>
                  }
                </>
              }
          </div>
        </div>
        {/* s2 */}
        <div className={"fjklsjklfjsksajas"} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            {
              props?.is_invite=== true && props?.arrayMember?.includes(props?._id) && <>
              <Button onClick={(e)=> {
                e.stopPropagation()
                props?.setArrayMember(prev=> [...prev, props?._id])
              }} disabled={props?.arrayMember?.includes(props?._id) ? true : false} variant={"primary"}>{"Đã thêm"}</Button>
              <Button style={{marginLeft: 8}} onClick={(e)=> {
                props?.setArrayMember(props?.arrayMember?.filter(item=> item?.trim() !== props?._id?.trim()))
              }}  variant={"secondary"}>{"Xóa"}</Button>
              </>
            }
            {
              props?.is_invite=== true && !props?.arrayMember?.includes(props?._id) && <Button onClick={(e)=> {
                e.stopPropagation()
                props?.setArrayMember(prev=> [...prev, props?._id])
              }} disabled={props?.arrayMember?.includes(props?._id) ? true : false} variant={"primary"}>{"Thêm"}</Button>
            }
            {
              props?.is_group=== true && props?.isHostGroup=== true  && (props?._id !== props?.my_id) && <>
                <Button onClick={async (e)=> {
                  e.stopPropagation()
                  await delete_member_id(props?._id, props?.id_conversation, props?.setResult)
                  .then(()=> {
                    enqueueSnackbar("Xóa thành công", {
                      variant: "error"
                    })
                  })
                  }} color={"primary"} style={{whiteSpace: "nowrap"}}>Xóa thành viên</Button>
              </>
            }            
        </div>
        {<PopupAddFriends open={open2} setOpen={setOpen2} {...props} />}
    </div> 
  )
};

export const PopupAddFriends = (props) => {
  const [data, setData] = useState();
  // eslint-disable-next-line
  const [data2, setData2] = useState();
   // eslint-disable-next-line
  const [newConversation, setNewConversation] = useState();
  const navigate= useNavigate()

  useEffect(() => {
    if (props._id) {
      get_conversation_friends(props._id, setData);
    }
  }, [props._id]);
 // eslint-disable-next-line
  const unfriend_f = async () => {
    await unfriend(props?._id, setData2);
    window.location.reload();
  };

  return (
    <Dialog open={props.open} onClose={() => props.setOpen(false)} maxWidth="sm" fullWidth>
      <DialogContent>
        <div style={{ width: '100%', height: 68, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 600, fontSize: 18 }}>
            {props.username}
          </div>
          <div onClick={() => props.setOpen(false)} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', padding: 10 }}>
            <GrClose onClick={() => props.setOpen(false)} />
          </div>
        </div>
        <CoverPhoto coverPhoto={props?.coverPhoto} />
        <Avatar avatar={props?.profilePicture} />
        <NameProfile username={props?.username} />
      </DialogContent>
      <DialogActions>
        <ButtonMui onClick={async () => {
          if (data.id_conversation) {
            navigate('/chat/' + data?.id_conversation);
          } else {
            await make_conversation(undefined, [props?._id, Cookies.get('uid')], Cookies.get('uid'), undefined, setNewConversation, navigate, 0);
          }
        }} variant="contained" color="primary">Nhắn tin</ButtonMui>
        {/* <Button onClick={unfriend_f} variant="contained" color="secondary">Hủy kết bạn</Button> */}
      </DialogActions>
    </Dialog>
  );
};



export default ListFriend