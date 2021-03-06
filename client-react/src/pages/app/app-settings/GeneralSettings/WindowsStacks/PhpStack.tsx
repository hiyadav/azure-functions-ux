import * as React from 'react';
import { connect } from 'react-redux';
import Dropdown from '../../../../../components/form-controls/DropDown';
import IState from '../../../../../modules/types';
import { ArmObj } from '../../../../../models/WebAppModels';
import { AvailableStack } from '../../../../../models/available-stacks';
import { Field, FormikProps } from 'formik';
import { AppSettingsFormValues } from '../../AppSettings.Types';
import { compose } from 'recompose';
import { translate, InjectedTranslateProps } from 'react-i18next';

export interface StateProps {
  stacks: ArmObj<AvailableStack>[];
  stacksLoading: boolean;
}

type Props = StateProps & FormikProps<AppSettingsFormValues> & InjectedTranslateProps;

const PhpStack: React.SFC<Props> = props => {
  const { stacks, stacksLoading, values, t } = props;
  const phpStack = stacks.find(x => x.name === 'php');
  if (!phpStack) {
    return null;
  }
  return (
    <Field
      name="config.properties.phpVersion"
      component={Dropdown}
      fullpage
      label={t('phpVersion')}
      id="phpVersion"
      disabled={!values.siteWritePermission}
      Loading={stacksLoading}
      options={phpStack!.properties.majorVersions.map(x => ({
        key: x.runtimeVersion,
        text: x.displayVersion,
      }))}
    />
  );
};

const mapStateToProps = (state: IState, ownProps: FormikProps<AppSettingsFormValues>) => {
  return {
    stacks: state.stacks.stacks.value,
    stacksLoading: state.stacks.loading,
  };
};
export default compose(
  connect(
    mapStateToProps,
    null
  ),
  translate('translation')
)(PhpStack);
