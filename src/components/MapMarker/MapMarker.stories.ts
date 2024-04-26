import { KakaoMap, MapMarker, type KakaoMarkerImage } from '@/components';
import { 서울특별시청_좌표, DEFAULT_MARKER_IMAGE } from '@/constants/coordinate';
import useKakao from '@/util/useKakao';
import type { Meta, StoryObj } from '@storybook/vue3';
import type { MapMarkerProps } from './MapMarker.vue';

const meta = {
  title: 'Components/MapMarker',
  component: MapMarker,
  parameters: {
    componentSubtitle: '카카오맵 마커 컴포넌트입니다.'
  },
  tags: ['autodocs'],
  argTypes: {
    image: {
      control: 'object'
    }
  }
} satisfies Meta<typeof MapMarker>;

export default meta;
type Story = StoryObj<typeof MapMarker>;

const renderKakaoMap: any = (args: MapMarkerProps) => ({
  components: { MapMarker, KakaoMap },
  setup() {
    useKakao(import.meta.env.VITE_KAKAO_APP_KEY ?? '');
    return { args };
  },
  template: `
    <KakaoMap :lat="args.lat" :lng="args.lng" :draggable="true">
      <MapMarker :lat="args.lat" :lng="args.lng" :image="args.image"></MapMarker>
    </KakaoMap>
  `
});

export const Default: Story = {
  render: renderKakaoMap,
  name: '기본 마커',
  args: {
    ...서울특별시청_좌표,
    image: DEFAULT_MARKER_IMAGE
  }
};

/**
 * 마커의 다른 이미지
 */
const anotherImage: KakaoMarkerImage = {
  imageSrc: `https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png`,
  imageWidth: 64,
  imageHeight: 64,
  imageOption: {}
};

export const MarkerImage: Story = {
  name: '다른 이미지로 마커 생성하기',
  render: (args: any) => ({
    components: { MapMarker, KakaoMap },
    setup() {
      useKakao(import.meta.env.VITE_KAKAO_APP_KEY ?? '');
      return { args };
    },
    template: `
      <KakaoMap :lat="args.lat" :lng="args.lng" :draggable="true">
        <MapMarker :lat="args.lat" :lng="args.lng" :image="args.image"></MapMarker>
      </KakaoMap>
    `
  }),
  args: {
    ...서울특별시청_좌표,
    image: anotherImage
  }
};
