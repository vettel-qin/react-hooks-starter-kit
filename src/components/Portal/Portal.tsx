import { Component } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import s from './Portal.scss';

interface IPortalProps {
  className?: string;
  mask?: boolean;
  through?: boolean;
  onClickOverlay?: (event: MouseEvent) => void;
}

const mountPoint = document.getElementById('react-modal') || document.body;
let refCount = 0;
let scrollTop = 0;

class Portal extends Component<IPortalProps> {
  public static defaultProps = {
    mask: true,
  };

  private el: HTMLElement;

  constructor(props: IPortalProps) {
    super(props);

    this.el = document.createElement('div');
    this.el.addEventListener('click', this.onClickOverlay);
    this.el.className = classNames(s.portal, props.className, {
      [s.mask]: props.mask,
      [s.through]: props.through,
    });
  }

  public componentDidMount() {
    mountPoint.appendChild(this.el);
    refCount++;
    if (refCount === 1) {
      scrollTop = document.documentElement!.scrollTop || document.body.scrollTop;
      document.body.classList.add(s.lockScroll);
      document.body.style.top = `${-scrollTop}px`;
    }
  }

  public componentWillUnmount() {
    mountPoint.removeChild(this.el);
    refCount--;
    if (refCount === 0) {
      document.body.classList.remove(s.lockScroll);
      document.body.style.top = '0';
      window.scrollTo(0, scrollTop);
    }
  }

  public render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }

  private onClickOverlay = (event: MouseEvent) => {
    const { onClickOverlay } = this.props;
    if (event.target === this.el && onClickOverlay) {
      onClickOverlay(event);
    }
  };
}

export default Portal;
