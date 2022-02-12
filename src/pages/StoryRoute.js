import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Story from "./Story"
import BlogContent from "./BlogContent";

function StoryRoute() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path={"/story"} component={Story} />
          <Route path={"/blog"} component={BlogContent} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default StoryRoute;