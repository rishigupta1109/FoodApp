import React from 'react'
import { Dropdown, Icon } from 'semantic-ui-react'
const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

const DropdownTriggerExample = (props) =>{ 
    const clickHandler=()=>{
        props.logout();
    }
    const trigger = (
        <span>
          <Icon name='user' /> Hello,{props.userName}
        </span>
      )
      
      const options = [
        {
          key: 'user',
          text: (
            <span>
              Signed in as <strong>{props.userName}</strong>
            </span>
          ),
          disabled: true,
        },
        { key: 'Your-Orders', text: 'Your Orders',onClick:props.openYourorder },
      
        { key: 'Log-out', text: 'Log Out' ,onClick:clickHandler },
      ]
      
    
    return (
  <Dropdown trigger={trigger} options={options} />
)}

export default DropdownTriggerExample;