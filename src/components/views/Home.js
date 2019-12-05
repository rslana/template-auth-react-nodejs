import React from 'react';
import MenuHorizontal from "../layouts/MenuHorizontal";
import { Container, Segment, Grid } from 'semantic-ui-react';

const Home = (props) => {
  return (
    <div id="home">
      <MenuHorizontal {...props} />
      <div className="pagina-inicial" style={{ marginTop: "20px" }}>
        <Container>
          <Segment padded>
            <h1>Hello World</h1>
            <p>This is a template using <a href="https://react.semantic-ui.com" target="_blank" rel="noopener noreferrer">Semantic UI React</a>, the official React integration for <a href="https://semantic-ui.com/" target="_blank" rel="noopener noreferrer">Semantic UI</a>.</p>
          </Segment>
          <Grid stackable>
            <Grid.Row columns={3}>
              <Grid.Column>
                <Segment padded color="blue">
                  <h3>Item 1</h3>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus necessitatibus pariatur possimus facere provident nostrum incidunt corrupti dignissimos porro repellendus ut neque, quia nesciunt temporibus magni impedit quam deserunt totam.</p>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment padded color="blue">
                  <h3>Item 2</h3>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus necessitatibus pariatur possimus facere provident nostrum incidunt corrupti dignissimos porro repellendus ut neque, quia nesciunt temporibus magni impedit quam deserunt totam.</p>
                </Segment>
              </Grid.Column>
              <Grid.Column>
                <Segment padded color="blue">
                  <h3>Item 3</h3>
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus necessitatibus pariatur possimus facere provident nostrum incidunt corrupti dignissimos porro repellendus ut neque, quia nesciunt temporibus magni impedit quam deserunt totam.</p>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </div>
    </div>
  )
}

export default Home
