import Logo from '../../components/logo/logo.component';
import {
  Container,
  UpgradePendingText,
} from './upgrade-loading.component.styles';
import './upgrade-loading.css';

export default function UpgradeLoadingComponent() {
  return (
    <Container>
      <Logo className="text-reveal-logo" />
      <UpgradePendingText className="text-reveal">
        Cooking up something new...
      </UpgradePendingText>
    </Container>
  );
}
