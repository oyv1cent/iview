import { createVue, destroyVM } from '../util';

describe('Alert.vue', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('should create', done => {
    vm = createVue('<Alert>An info prompt</Alert>');
    const alertComponent = vm.$el;

    expect(alertComponent.tagName).to.equal('DIV');
    expect(alertComponent.classList.contains('ivu-alert')).to.true;
    done();
  });

  it('type', done => {
    vm = createVue('<Alert type="success">A success prompt</Alert>');
    const alertComponent = vm.$el;

    expect(alertComponent.classList.contains('ivu-alert-success')).to.true;
    done();
  });

  it('show-icon', done => {
    vm = createVue('<Alert show-icon>An info prompt</Alert>');
    const alertComponent = vm.$el;

    expect(alertComponent.classList.contains('ivu-alert-with-icon')).to.true;
    expect(alertComponent.children[0].classList.contains('ivu-alert-icon')).to.true;
    done();
  });


  it('closable', done => {
    vm = createVue('<div><Alert closable>An info prompt</Alert></div>');
    const alertComponentWrap = vm.$el;

    expect(alertComponentWrap.children[0] === undefined).to.false;
    alertComponentWrap.querySelector('.ivu-alert-close').click();
    setTimeout(() => {
      expect(alertComponentWrap.children[0] === undefined).to.true;
      done();
    },100);
  });

  it('desc slot', done => {
    vm = createVue(`
    <Alert show-icon>
        An info prompt
        <template slot="desc">Content of prompt. Content of prompt. Content of prompt. Content of prompt. </template>
    </Alert>
    `);
    const alertComponent = vm.$el;

    expect(alertComponent.querySelector('.ivu-alert-desc').textContent).to.equal('Content of prompt. Content of prompt. Content of prompt. Content of prompt. ');
    done();
  });

  it('icon slot', done => {
    vm = createVue(`
    <Alert show-icon>
        An info prompt
        <Icon type="ios-bulb-outline" slot="icon"></Icon>
    </Alert>
    `);
    const alertComponent = vm.$el;

    expect(alertComponent.querySelector('.ivu-alert-icon').children[0].classList.contains('ivu-icon-ios-bulb-outline')).to.true;
    done();
  });


  it('close slot', done => {
    vm = createVue(`
    <Alert show-icon closable>
        An info prompt
        <span slot="close">No longer prompt</span>
    </Alert>
    `);
    const alertComponent = vm.$el;

    expect(alertComponent.querySelector('.ivu-alert-close').children[0].textContent).to.equal('No longer prompt');
    done();
  });

});
