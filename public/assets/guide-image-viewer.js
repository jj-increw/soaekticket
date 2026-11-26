const guideImageDialog = document.querySelector('.guide-image-dialog');
const guideImageScroll = guideImageDialog.querySelector('.guide-image-scroll');

document.querySelectorAll('.guide-visual').forEach(button => {
  button.addEventListener('click', () => {
    const image = button.querySelector('img').cloneNode();
    image.loading = 'eager';
    guideImageScroll.replaceChildren(image);
    guideImageDialog.showModal();
    guideImageScroll.scrollTo({ top: 0, left: 0 });
  });
});

guideImageDialog.addEventListener('close', () => guideImageScroll.replaceChildren());
