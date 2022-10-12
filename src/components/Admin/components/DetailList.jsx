import React from "react"
import styled from "styled-components"
import oc from "open-color";
const DetailList = (props) => {
    //snstype selectbox를 위한 변수
    const sendSnsurl = (e, order) => {
        props.getSnsurl(
            order - 1, e.target.value
        )
    }
    const sendSnstype = (e, order) => {
        props.getSnstype(
            order - 1, e.target.value
        )
        console.log(e.target.value);
    }
    return (
        <div>
            {props.countList && props.countList.map((item, i) => (
                <div key={i}>
                    <div>
                        <p>SNS TYPE</p>
                        <Select
                            onChange={(event) =>
                                sendSnstype(event, i + 1)}
                        >
                            <option value="none" selected>Select snstype</option>
                            {props.snsselect && props.snsselect.map((snstype) => {
                                return <option
                                    value={snstype.id}
                                    selected={snstype.id === props.snsData[i]['snstype']}
                                >
                                    {snstype.name}
                                </option>
                            })}
                            <option value="0">직접 입력</option>
                        </Select>
                        <input
                            disabled={props.snsData[i]['snstype'] === "0" ? false : true}
                            style={{ width: "50%", shadow: "0px 4px 4px rgba(51, 51, 51, 0.04)", radius: "4px", height: "2.5rem", float: "right" }}
                            value={props.snsData[i]['snstype_name']}
                            onChange={(event) => sendSnstype(event, i + 1)}
                        />
                    </div>
                    <div style={{ width: "100%" }}>
                        <input
                            style={{ width: "100%", shadow: "0px 4px 4px rgba(51, 51, 51, 0.04)", radius: "4px", height: "2.5rem" }}
                            placeholder="sns url"
                            onChange={(event) => sendSnsurl(event, i + 1)}
                            value={props.snsData[i]['url']}
                        />
                    </div>
                </div>
            ))}
        </div>
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