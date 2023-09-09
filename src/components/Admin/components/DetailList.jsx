import React, {useState} from "react"
import styled from "styled-components"
import oc from "open-color";
const DetailItem = ({sns_type, snsDataUrl, snsselect, setNewSnsData}) => {
    //snstype selectbox를 위한 변수
    const [value, setValue] = useState("");
    const [snsId, setSnsId] = useState(0);
    
    const saveData = (e) => {
        e.preventDefault();
        setNewSnsData({sns_type: snsId, url: value});
        alert("저장되었습니다");
    }

    // console.log(value);
    return (
            <div>
                <div>
                    <p>SNS TYPE</p>
                    <Select onChange={(e) => {setSnsId(e.target.value)}}>
                        <option value="none" selected>Select snstype</option>
                        {snsselect && snsselect.map((snstype) => {
                            return <option
                                value={snstype.id}
                                selected={snstype.id === sns_type}
                            >
                                {snstype.name}
                            </option>
                        })}
                    </Select>
                </div>
                <div style={{ width: "100%" }}>
                    <input
                        style={{ width: "100%", shadow: "0px 4px 4px rgba(51, 51, 51, 0.04)", radius: "4px", height: "2.5rem", marginTop: "20px" }}
                        placeholder="sns url"
                        onChange={(e) => setValue(e.target.value)}
                        defaultValue={snsDataUrl}
                    />                    
                </div>
                <button style={{ width: "100%" }} onClick={saveData}>
                    저장하기
                </button> 
            </div>
    )
}

const DetailList = (props) => {
    console.log(props)
    return (
        <>
            {props.countList && props.countList.map((item, i) => (
                <div key={i} style={{width: "25%"}}>
                    {props.snsData&&props.snsData.map((data, j) => (
                        <DetailItem
                            key={j}
                            snsDataUrl = {data.url}
                            sns_type = {data.sns_type}
                            setNewSnsData={props.setNewSnsData}
                            snsselect={props.snsselect}
                        />
                    ))}
                </div>
            ))}
       </>
    )
}

const Select = styled.select`
  float : left;
  width: 40%;
  border: 1px solid ${oc.gray[3]};
  outline: none;
  border-radius: 4px;
//   line-height: 2.5rem;
  font-size: 1rem;
  padding-left: 10px;
  padding: 0.2em;
  box-shadow: 0px 4px 4px rgba(51, 51, 51, 0.04), 0px 4px 16px rgba(51, 51, 51, 0.08);
`;


export default DetailList