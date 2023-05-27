// Exemplo https://js.devexpress.com/Demos/WidgetsGallery/Demo/Scheduler/Overview/React/Light/Compact/

export default function ResourceCell() {
    const { data: { color, text, data: { avatar, age, discipline } } } = this.props;

    return (
        <div className="dx-template-wrapper">
            <div className="name" style={{ background: color }}>
                <h2>{text}</h2>
            </div>
            <div className="avatar">
                <img src={avatar} />
            </div>
            <div className="info" style={{ color }}>
                Age: {age}
                <br />
                <b>{discipline}</b>
            </div>
        </div>
    );

}