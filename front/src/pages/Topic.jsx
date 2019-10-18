import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTopicsData, editTopic } from '../redux/Lections/actions';
import { Button, Header, Modal, Form } from 'semantic-ui-react';

class Topic extends Component {
  state = {
    topic: {},
    videostr: '',
    str: '',
    topicPhase: '',
    topicWeek: '',
    topicDay: '',
    youtubeLink: '',
    githubLink: '',
    topicName: '',
    modalOpen: false,
    buttonClicked: '',
    closedStatus: false,
    changeData: true,
    fileLink: './img/Very_Secret.zip',
    fileName: 'Very_Secret.zip',
  };
  async componentDidMount() {
    await this.props.getTopics(this.props.selectedGroup);

    const topic = this.props.allTopics.find(el => el._id === this.props.match.params.id);
    await this.setState({
      topicName: topic.topicName,
      topicPhase: topic.phase,
      topicWeek: topic.week,
      topicDay: topic.day,
    });
    const videoSrc = topic.video;
    let videostr = '';
    if (videoSrc.includes('watch')) {
      videostr = videoSrc.replace('watch?v=', 'embed/');
    } else {
      videostr = videoSrc.replace('youtu.be/', 'youtube.com/embed/');
    }
    this.setState({ topic: topic, videostr: videostr });
  }
  youtubeLink = e => {
    this.setState({ youtubeLink: e.target.value });
  };
  topicName = e => {
    this.setState({ topicName: e.target.value });
  };
  githubLink = e => {
    this.setState({ githubLink: e.target.value });
  };
  fileLink = e => {
    this.setState({ fileLink: e.target.value });
  };

  handleOpen = e => {
    this.setState({ modalOpen: true });
  };
  handleClose = e => {
    this.setState({ modalOpen: false });
  };
  func = async () => {
    let data = {
      youtubeLink: this.state.youtubeLink,
      githubLink: this.state.githubLink,
      topic: this.state.topicName,
      id: this.props.match.params.id,
    };
    this.props.editTopic(data);
    this.setState({ modalOpen: false, changeData: false });
    this.setState({ changeData: false });
  };
  get = async e => {
    e.preventDefault();
    this.setState({ changeData: true });
    this.func();
  };

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.changeData && !this.state.changeData) {
      await this.func();
      await this.props.getTopics(this.props.selectedGroup);
      const topic = this.props.allTopics.find(el => el._id === this.props.match.params.id);
      this.setState({
        topicName: topic.topicName,
        topicPhase: topic.phase,
        topicWeek: topic.week,
        topicDay: topic.day,
      });
      const videoSrc = topic.video;
      let videostr = '';
      if (videoSrc.includes('watch')) {
        videostr = videoSrc.replace('watch?v=', 'embed/');
      } else {
        videostr = videoSrc.replace('youtu.be/', 'youtube.com/embed/');
      }
      this.setState({ topic: topic, videostr: videostr });
    }
  }

  render() {
    return (
      <>
        <div className="videoContainer">
          {this.props.admin === 'admin' ? (
            <>
              <Modal
                trigger={
                  <Button className="changeTopic" basic color="violet" onClick={this.handleOpen}>
                    Изменить урок
                  </Button>
                }
                closeIcon
                open={this.state.modalOpen}
                onClose={this.handleClose}
              >
                <Modal.Header>{this.state.topicName}</Modal.Header>
                <Modal.Content>
                  <Modal.Description>
                    <Header as="h3" className="regForm">
                      Фаза: {this.state.topicPhase} / Неделя: {this.state.topicWeek} / День: {this.state.topicDay}
                    </Header>
                    <Modal.Actions>
                      <Form className="regForm">
                        <Form.Field>
                          <label htmlFor="topicname">TopicName</label>
                          <input type="text" name="topicname" required onChange={this.topicName} />
                        </Form.Field>
                        <Form.Field>
                          <label htmlFor="youtubelink">YoutubeLink</label>
                          <input type="text" name="youtubelink" onChange={this.youtubeLink} />
                        </Form.Field>
                        <Form.Field>
                          <label htmlFor="githubLink">githubLink</label>
                          <input type="text" name="githubLink" onChange={this.githubLink} />
                        </Form.Field>
                        <Form.Field>
                          <label htmlFor="fileLink">fileLink</label>
                          <input type="text" name="fileLink" onChange={this.fileLink} />
                        </Form.Field>
                        <div className="form-field userSendForm">
                          <Button basic color="violet" type="button" className="Button" onClick={this.get}>
                            Отправить
                          </Button>
                        </div>
                      </Form>
                    </Modal.Actions>
                  </Modal.Description>
                </Modal.Content>
              </Modal>
            </>
          ) : (
            <></>
          )}
          <h1 className="topicHeader">Тема урока: {this.state.topicName}</h1>

          <div className="video">
            <iframe
              src={this.state.videostr}
              width="960"
              height="540"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="video"
            />
          </div>
          <div className="videoLinksFilesSegment">
            <div className="videoLinksFiles">
              <div className="videoLinks">
                <a target="_blank" rel="noopener noreferrer" href={this.state.topic.githubLink}>
                  Задания на GitHub
                </a>
              </div>
              <div className="videoFile">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/Elbrus-Bootcamp/skeleton-express-session"
                >
                  Код урока
                </a>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    allTopics: state.Topics.allTopics,
    selectedGroup: state.Topics.selectedGroupName,
    admin: state.User.user.adminstatus,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    editTopic: data => dispatch(editTopic(data)),
    getTopics: selectedGroup => dispatch(getTopicsData(selectedGroup)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Topic);
