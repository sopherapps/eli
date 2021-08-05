/**
 * Module contains the models to store as configuration for a given user.
 * Ideally there might be an option to clear past configurations
 */

export interface UserAppConfig {
  tabs: Tab[];
}

export interface Tab {
  isOpen: boolean;
  title: string;
}

//  type Tab struct {
// 	IsOpen bool `json:"is_open"`
// 	Title string `json:"title"`
// 	Visualizations map[string]Visualization `json:"visualizations"`
// 	Order []string `json:"order"` // list of IDs that are randomly generated using system time and name of visualization
// }

// // Opens the tab and makes the visualizations start receiving data
// func (t *Tab) Open(ctx context.Context, ipc *back.Ipc) error {
// 	// cleanup just in case
// 	t.cleanupVisualizations(ipc)
// 	t.IsOpen = true

// 	errGroup, _ := errgroup.WithContext(ctx)

// 	for _, v := range t.Visualizations {
// 		visualization := v
// 		errGroup.Go(func() error {
// 			return visualization.ConnectToPubSubQ(ipc)
// 		})
// 	}

// 	return errGroup.Wait()
// }

// // Closes the tab and ensures all visualisations stop receiving data
// func (t *Tab) Close(ipc *back.Ipc) {
// 	t.cleanupVisualizations(ipc)
// 	t.IsOpen = false
// }

// // Saves the tab to the cache
// func (t *Tab) Save(ipc *back.Ipc, jsonCache *JsonCache) {
// 	t.Close(ipc)
// 	jsonCache.Set(t.Title, *t)
// }

// // Deletes the tab from the cache
// func (t *Tab) Delete(ipc *back.Ipc, jsonCache *JsonCache) {
// 	t.Close(ipc)
// 	jsonCache.Delete(t.Title)
// }

// // Cleans up the visualizations in case a change is made on this tab
// func (t *Tab) cleanupVisualizations(ipc *back.Ipc)  {
// 	if !t.IsOpen {
// 		return
// 	}

// 	for _, v := range t.Visualizations {
// 		ipc.EventsChan <- back.Event{Type: back.CloseVisualizationEvent, ElementId: v.GetID(), Data: nil}
// 	}
// }

// type Visualization interface {
// 	ConnectToPubSubQ(ipc *back.Ipc) error
// 	GetID() string
// }

// type BaseVisualization struct {
// 	ID string `json:"id"`
// 	Title string `json:"title"`
// 	PubSubQUrl string `json:"pub_sub_q_url"`
// 	Width float64 `json:"width"`
// 	Height float64 `json:"height"`
// }

// // Gets the ID of the given visualization
// func (b *BaseVisualization) GetID() string {
// 	return b.ID
// }

// // Connects to the PubSubQ instance, listens to the data and pushes it to the
// // front end via the ipc but closes it if the front end decides to close the visualization
// func (b *BaseVisualization) ConnectToPubSubQ(ipc *back.Ipc) error {
// 	p, err := back.ConnectToPubSubQ(b.PubSubQUrl)
// 	if err != nil {
// 		return fmt.Errorf("error connecting to PubSubQ: %s", err)
// 	}
// 	defer p.Close()

// 	errChan := make(chan error)
// 	msgChan := make(chan []byte)

// 	go p.Listen(msgChan, errChan)

// 	for {
// 		select {
// 		case e := <- errChan:
// 			return e
// 		case msg := <- msgChan:
// 			event := back.Event{Type: back.PubSubQMessageEvent, Data: msg, ElementId: b.ID}
// 			err = ipc.SendToFront(event)
// 			if err != nil {
// 				errChan <- err
// 			}
// 		case ev := <- ipc.EventsChan:
// 			if (ev.Type == back.CloseVisualizationEvent ||
// 				ev.Type == back.DeleteVisualizationEvent ||
// 				ev.Type == back.UpdateVisualizationEvent) && ev.ElementId == b.ID {
// 				return nil
// 			}
// 		}
// 	}
// }

// // Tables
// type Table struct {
// 	BaseVisualization
// 	ColumnField string `json:"column_field"`
// 	RowField string `json:"row_field"`
// 	ValueField string `json:"value_field"`
// }

// // Scatter charts
// type ScatterChart struct {
// 	BaseVisualization
// 	Config ScatterChartConfig `json:"config"`
// }

// type ScatterChartConfig struct {
// 	Type string `json:"type"`
// 	Label string `json:"label"`
// 	Color string `json:"color"`
// 	Style string `json:"style"`
// 	XField string `json:"x_field"`
// 	YField string `json:"y_field"`
// }

// // Bar charts
// type BarChart struct {
// 	BaseVisualization
// 	Config BarChartConfig `json:"config"`
// }

// type MultipleBarChart struct {
// 	BaseVisualization
// 	Config []BarChartConfig `json:"config"`
// }

// type BarChartConfig struct {
// 	Type string `json:"type"`
// 	Label string `json:"label"`
// 	Color string `json:"color"`
// 	Style string `json:"style"`
// 	XField string `json:"x_field"` // stacked, normal
// 	YField string `json:"y_field"`
// 	Horizontal bool `json:"horizontal"`
// }

// // Line charts
// type LineChart struct {
// 	BaseVisualization
// 	Config LineChartConfig `json:"config"`
// }

// type MultipleLineChart struct {
// 	BaseVisualization
// 	Config []LineChartConfig `json:"config"`
// }

// type LineChartConfig struct {
// 	Type string `json:"type"`
// 	Label string `json:"label"`
// 	Color string `json:"color"`
// 	Style string `json:"style"` // dotted, normal
// 	XField string `json:"x_field"`
// 	YField string `json:"y_field"`
// 	AreaUnderLineColor string `json:"area_under_line_color"`
// }

// // MixedChart
// type MixedChart struct {
// 	BaseVisualization
// 	LineConfig []LineChartConfig `json:"line_config"`
// 	BarConfig []BarChartConfig `json:"bar_config"`
// }

// // Ordered Lists
// type OrderedList struct {
// 	BaseVisualization
// 	Style string `json:"style"` // upper-roman, lower-alpha
// 	ValueField string `json:"value_field"`
// }

// // Unorderd Lists
// type UnorderedList struct {
// 	BaseVisualization
// 	Style string `json:"style"` // circle, square
// 	ValueField string `json:"value_field"`
// }

// // Text
// type Text struct {
// 	BaseVisualization
// 	FontSize int64 `json:"font_size"`
// 	ValueField string `json:"value_field"`
// 	Bold bool `json:"bold"`
// 	Italic bool `json:"italic"`
// 	Alignment string `json:"alignment"` // right, left, center
// }

// // Piechart
// type PieChart struct {
// 	BaseVisualization
// 	ValueField string `json:"value_field"`
// 	LabelField string `json:"label_field"`
// }
