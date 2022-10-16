function Bar({description}) {
    return (  
      <div className="progress-bar">
        <p className="progress-bar-text">
            ...
            <span className="progress-bar-divider"></span>
            <span className="progress-bar-divider-space"></span>
            4
            <span className="progress-bar-divider"></span>
            <span className="progress-bar-divider-space"></span>
            5
            <span className="progress-bar-divider"></span>
            <span className="progress-bar-divider-space"></span>
            {description}</p>
        </div>
    )
}

export default Bar;