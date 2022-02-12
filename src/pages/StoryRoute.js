import React from "react";
import { Switch, Route } from "react-router-dom";
import Story from "./Story"
import BlogContent from "./BlogContent";

function StoryRoute() {
  return (
      <div>
        <Switch>
          <Route exact path={"/story"} component={Story} />
          <Route path={"/blog"} component={BlogContent} />
        </Switch>
      </div>
  );
}

export default StoryRoute;