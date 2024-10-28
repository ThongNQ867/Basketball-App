/* eslint-disable prettier/prettier */
import {View} from 'react-native';
import React from 'react';
import {BarChart} from 'react-native-chart-kit';
import {vw} from '../styles/stylesheet';
import {ChartData} from 'react-native-chart-kit/dist/HelperTypes';
import {AbstractChartConfig} from 'react-native-chart-kit/dist/AbstractChart';

type Props = {
  data: ChartData;
  chartConfig: AbstractChartConfig;
};

const BarChartComponent = (props: Props) => {
  return (
    <View>
      <BarChart
        data={props.data}
        width={vw(100)}
        height={270}
        yAxisLabel=""
        yAxisSuffix=""
        chartConfig={props.chartConfig}
        verticalLabelRotation={0}
        fromZero
        showValuesOnTopOfBars={false}
        withInnerLines={false}
        showBarTops={false}
      />
    </View>
  );
};

export default BarChartComponent;

// const styles = StyleSheet.create({});
